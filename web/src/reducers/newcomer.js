import * as rootAction from '../actions';

const student = (state = {}, action) => {
    // noinspection JSRedundantSwitchStatement
    switch (action.type) {
        case rootAction.action.RECEIVE_STUDENT:
            return {
                ...state,
                id: action.data.student.id,
                name: action.data.student.fields.fullName
            };
        default:
            return state;
    }
};

const newcomer = (state = {
    isFetching: false,
    didInvalidate: false
}, action) => {
    switch (action.type) {
        case rootAction.action.REQUEST_STUDENT:
            return {
                ...state,
                isFetching: true
            };
        case rootAction.action.RECEIVE_STUDENT:
            return {
                ...state,
                student: student(state[student], action)
            };
        case rootAction.action.RECEIVE_O_AUTH_URL:
            return {
                ...state,
                isFetching: false,
                oAuthUrl: action.data.url
            };
        default:
            return state;
    }
};

export default newcomer;
