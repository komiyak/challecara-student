import * as rootAction from '../actions';

// 階層的な state を構築するヘルパー
// @param state 状態
// @param path 評価値をセットする位置。例：path = ['layer1', 'layer2'] ならば、state.layer1.layer2 に値が入る。
// @param method 評価器
const assignChildState = (state, action, path, method) => {
    // 指定した path の state を取得
    const _getStateWithPath = (_state, _path) => {
        let current = _state;

        for (let key of _path) {
            current = current[key];
            if (!current) {
                break;
            }
        }
        return (current) ? current : {};
    };

    const result = method(_getStateWithPath(state, path), action);
    return assignObjectWithPath(state, result, path);
};

// @param state 状態
// @param value セットしたい値（Can accept Object, Array and Nested object.）
// @param path value をセットする位置。例：path = ['layer1', 'layer2'] ならば、state.layer1.layer2 に value が入る。
const assignObjectWithPath = (state, value, path) => {
    const recursion = (current, index = 0) => {
        const key = path[index];
        const isLast = (path.length <= index + 1);

        // Assign a new object if needed.
        if (!current[key]) {
            current[key] = {}
        }

        if (isLast) {
            Object.assign(current[key], value);
        } else {
            recursion(current[key], index + 1);
        }
    };

    recursion(state);
    return state;
};


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

const step2 = (state = {invalid: true}, action) => {
    // noinspection JSRedundantSwitchStatement
    switch (action.type) {
        case rootAction.action.REQUEST_AUTHENTICATION:
            return {
                ...state,
                invalid: true,
                isFetching: true
            };
        case rootAction.action.RECEIVE_AUTHENTICATION:
            return {
                ...state,
                invalid: false,
                isFetching: false,
            };
        default:
            return state;
    }
};

const newcomer = (state = {
    isFetching: false,
    didInvalidate: false
}, action) => {
    // assignChildState(state, action, ['scene1'], scene1);
    // assignChildState(state, action, ['scene1', 'student'], scene1Student);
    // assignChildState(state, action, ['scene2'], scene2);

    switch (action.type) {
        case rootAction.action.REQUEST_AUTHENTICATION:
        case rootAction.action.RECEIVE_AUTHENTICATION:
            return {
                ...state,
                step2: step2(state[step2], action)
            };

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

