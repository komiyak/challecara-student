import { createSlice } from 'redux-starter-kit'

/**
 * newcomer .. /newcomer 画面
 * newcomer.screen1 .. QRコード読み取り直後の画面で使用する
 * newcomer.screen2 .. LINE Login コールバック後の画面で使用する
 */
const newcomer = createSlice({
  slice: 'Newcomer',
  initialState: {},
  reducers: {
    requestStudent(state) {
      state.screen1 = state.screen1 || {}

      state.screen1.isFetching = true
    },
    receiveStudent(state, action) {
      state.screen1 = state.screen1 || {}

      state.screen1.student = action.payload
    },
    receiveOAuthUrl(state, action) {
      state.screen1 = state.screen1 || {}

      state.screen1.isFetching = false
      state.screen1.oAuthUrl = action.payload
    },
    requestAuthentication(state) {
      state.screen2 = state.screen2 || {}

      state.screen2.isFetching = false
    },
    receiveAuthentication(state, action) {
      state.screen2 = state.screen2 || {}

      state.screen2.isFetching = true
      state.screen2.authentication = action.payload
    }
  }
})

export const { actions } = newcomer

/**
 * [Async] 学生データ等を取得する
 * @param match
 * @returns {Function}
 */
export const fetchStudent = match => (dispatch, getState, { firebase }) => {
  const studentId = match.params.student_id

  dispatch(actions.requestStudent({ studentId: studentId }))
  firebase.functions().httpsCallable('getStudent')({ id: studentId })
    .then(result => {
      dispatch(actions.receiveStudent(result.data.student))
      return firebase.functions().httpsCallable('getOAuthUrl')({
        redirectUrl: process.env.REACT_APP_O_AUTH_CALLBACK_URL,
        studentId: studentId,
        year: 2019
      })
    })
    .then(result => {
      dispatch(actions.receiveOAuthUrl(result.data))
    })
}

/**
 * [Async] サーバー認証を実行する
 * @param location
 * @returns {Function}
 */
export const authenticate = (location) => (dispatch, getState, { firebase }) => {
  const queryString = require('query-string')
  const queries = queryString.parse(location.search)

  const code = queries.code
  const state = queries.state

  if (code && state) {
    dispatch(actions.requestAuthentication())

    firebase.functions().httpsCallable('authenticateWithLine')({
      code,
      state,
      redirectUrl: process.env.REACT_APP_O_AUTH_CALLBACK_URL
    }).then(result => {
      dispatch(actions.receiveAuthentication(result.data))
    })
  }
}

const { reducer } = newcomer
export default reducer
