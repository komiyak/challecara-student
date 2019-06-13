import * as firebase from 'firebase/app';
import "firebase/functions";

// NOTE 将来的には、オプションとして localhost の function を見れるようにしたい
firebase.initializeApp({
    apiKey: "AIzaSyCuuDnt1RHqFrg9_9uT-b7IGwyXZNeVL5w",
    authDomain: "challecara-student.firebaseapp.com",
    databaseURL: "https://challecara-student.firebaseio.com",
    projectId: "challecara-student",
    storageBucket: "challecara-student.appspot.com",
    messagingSenderId: "202630578146",
    appId: "1:202630578146:web:a970db057cb8df40"
});

export const action = {
    REQUEST_STUDENT: 'root/REQUEST_STUDENT',
    RECEIVE_STUDENT: 'root/RECEIVE_STUDENT',
    RECEIVE_O_AUTH_URL: 'root/RECEIVE_O_AUTH_URL',
    REQUEST_AUTHENTICATION: 'root/REQUEST_AUTHENTICATION',
    RECEIVE_AUTHENTICATION: 'root/RECEIVE_AUTHENTICATION'
};

export const actionCreator = {
    requestStudent: studentId => ({
        type: action.REQUEST_STUDENT,
        studentId
    }),
    receiveStudent: data => ({
        type: action.RECEIVE_STUDENT,
        data: data,
        receivedAt: Date.now()
    }),
    receiveOAuthUrl: data => ({
        type: action.RECEIVE_O_AUTH_URL,
        data: data,
        receivedAt: Date.now()
    }),
    requestAuthentication: () => ({
        type: action.REQUEST_AUTHENTICATION
    }),
    receiveAuthentication: data => ({
        type: action.RECEIVE_AUTHENTICATION,
        data: data,
        receivedAt: Date.now()
    })
};

const shouldFetchStudent = (state) => {
    const newcomer = state.newcomer;
    if (!newcomer.student) {
        return true;
    }
    if (newcomer.isFetching) {
        return false;
    }
    return newcomer.didInvalidate;
};

// noinspection JSUnusedGlobalSymbols
export const fetchStudentIfNeeded = match => (dispatch, getState) => {
    if (shouldFetchStudent(getState())) {
        const studentId = match.params.student_id;

        dispatch(actionCreator.requestStudent(studentId));

        firebase.functions().httpsCallable('getStudent')({id: studentId})
            .then(result => {
                //console.log('getStudent: ', result);
                dispatch(actionCreator.receiveStudent(result.data));
                return firebase.functions().httpsCallable('getOAuthUrl')({
                    redirectUrl: process.env.REACT_APP_O_AUTH_CALLBACK_URL,
                    studentId: studentId,
                    year: 2019
                });
            })
            .then(result => {
                //console.log('getOAuthUrl: ', result);
                dispatch(actionCreator.receiveOAuthUrl(result.data));
            });

    }
};

export const authenticate = (location) => (dispatch) => {
    const queryString = require('query-string');
    const queries = queryString.parse(location.search);

    const code = queries.code;
    const state = queries.state;

    if (code && state) {
        dispatch(actionCreator.requestAuthentication());

        firebase.functions().httpsCallable('authenticateWithLine')({code, state, redirectUrl: process.env.REACT_APP_O_AUTH_CALLBACK_URL})
            .then(result => {
                console.log('authenticateWithLine: ', result);
                dispatch(actionCreator.receiveAuthentication(result.data));
            });
    }
};
