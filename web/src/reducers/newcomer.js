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
                isFetching: true,
                didInvalidate: false
            };
        case rootAction.action.RECEIVE_STUDENT:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                student: student(state[student], action)
            };
        default:
            return state;
    }
};

export default newcomer;
