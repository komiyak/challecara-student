import * as rootAction from '../actions'

const pj = (obj) => {
  return JSON.stringify(obj)
}

// 階層的な state を構築するヘルパー
// @param state 状態
// @param path 評価値をセットする位置。例：path = ['layer1', 'layer2'] ならば、state.layer1.layer2 に値が入る。
// @param method 評価器
const assignStateForChild = (state, action, path, method) => {
  // 指定した path の state を取得
  const _getStateWithPath = (_state, _path) => {
    let current = _state

    for (let key of _path) {
      current = current[key]
      if (!current) {
        break
      }
    }
    return (current) || {}
  }

  const result = method(_getStateWithPath(state, path), action)
  console.log('method result is :', result)
  return assignObjectWithPath(state, result, path)
}

// @param state 状態
// @param value セットしたい値（Can accept Object, Array and Nested object.）
// @param path value をセットする位置。例：path = ['layer1', 'layer2'] ならば、state.layer1.layer2 に value が入る。
const assignObjectWithPath = (state, value, path) => {
  let clonedState = { ...state }

  console.log('state:', pj(state))
  console.log('state:', state)

  const recursion = (current, index = 0) => {
    const key = path[index]
    const isLast = (path.length <= index + 1)

    // Assign a new object if needed.
    if (!current[key]) {
      current[key] = {}
    }

    if (isLast) {
      Object.assign(current[key], value)
    } else {
      recursion(current[key], index + 1)
    }
  }

  console.log('clonedState: ', clonedState)
  recursion(clonedState)
  console.log('clonedState after: ', clonedState)
  return clonedState
}

const scene1Student = (state = {}, action) => {
  // noinspection JSRedundantSwitchStatement
  switch (action.type) {
    case rootAction.action.RECEIVE_STUDENT:
      return {
        ...state,
        id: action.data.student.id,
        name: action.data.student.fields.fullName
      }
    default:
      return state
  }
}

const step2 = (state = { invalid: true }, action) => {
  // noinspection JSRedundantSwitchStatement
  switch (action.type) {
    case rootAction.action.REQUEST_AUTHENTICATION:
      return {
        ...state,
        invalid: true,
        isFetching: true
      }
    case rootAction.action.RECEIVE_AUTHENTICATION:
      return {
        ...state,
        invalid: false,
        isFetching: false
      }
    default:
      return state
  }
}

const scene1 = (state = {}, action) => {
  switch (action.type) {
    case rootAction.action.REQUEST_STUDENT:
      console.log('rootAction.action.REQUEST_STUDENT')
      console.log(state)
      return {
        ...state,
        isFetching: true
      }
    case rootAction.action.RECEIVE_STUDENT:
      return {
        ...state,
        isFetching: true
      }
    case rootAction.action.RECEIVE_O_AUTH_URL:
      return {
        ...state,
        isFetching: false,
        oAuthUrl: action.data.url
      }
    default:
      return state
  }
}

const newcomer = (state = {}, action) => {
  state = assignStateForChild(state, action, ['scene1'], scene1)
  // assignStateForChild(state, action, ['scene1', 'student'], scene1Student);
  // assignChildState(state, action, ['scene1', 'student'], scene1Student);
  // assignChildState(state, action, ['scene2'], scene2);

  console.log(`The newcomer is: ${pj(state)}, and the action is: ${pj(action)}`)

  switch (action.type) {
    // case rootAction.action.REQUEST_AUTHENTICATION:
    // case rootAction.action.RECEIVE_AUTHENTICATION:
    //     return {
    //         ...state,
    //         step2: step2(state[step2], action)
    //     };
    default:
      return state
  }
}

export default newcomer
