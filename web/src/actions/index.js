import * as firebase from 'firebase/app';
import "firebase/functions";

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
    RECEIVE_O_AUTH_URL: 'root/RECEIVE_O_AUTH_URL'
};

export const actionCreator = {
    requestStudent: studentId => ({
        type: action.REQUEST_STUDENT,
        studentId
    }),
    receiveStudent: (data) => ({
        type: action.RECEIVE_STUDENT,
        data: data,
        receivedAt: Date.now()
    }),
    receiveOAuthUrl: data => ({
        type: action.RECEIVE_O_AUTH_URL,
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
                    redirectUrl: 'http://localhost:3000/student-entrance/line-callback/',
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
