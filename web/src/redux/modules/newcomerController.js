import * as newcomer from './newcomer'
import * as authentication from './authentication'

export const newcomerController = {
  /**
   * [Async] 学生データ等を取得する
   * @param match
   * @returns {Function}
   */
  fetchStudent: match => (dispatch, getState, { firebase }) => {
    const studentId = match.params.student_id

    dispatch(newcomer.actions.requestStudent({ studentId: studentId }))
    firebase.functions().httpsCallable('getStudent')({ id: studentId })
      .then(result => {
        dispatch(newcomer.actions.receiveStudent(result.data.student))
        return firebase.functions().httpsCallable('getOAuthUrl')({
          redirectUrl: process.env.REACT_APP_O_AUTH_CALLBACK_URL,
          studentId: studentId,
          year: 2019
        })
      })
      .then(result => {
        dispatch(newcomer.actions.receiveOAuthUrl(result.data))
      })
  },

  /**
   * [Async] サーバー認証を実行する
   * @param location
   * @returns {Function}
   */
  authenticate: (location) => (dispatch, getState, { firebase }) => {
    const queryString = require('query-string')
    const queries = queryString.parse(location.search)

    const code = queries.code
    const state = queries.state

    if (code && state) {
      dispatch(newcomer.actions.requestAuthentication())

      firebase.functions().httpsCallable('authenticateWithLine')({
        code,
        state,
        redirectUrl: process.env.REACT_APP_O_AUTH_CALLBACK_URL
      }).then(result => {
        const token = result.data.token
        dispatch(newcomer.actions.receiveAuthentication(result.data))
        dispatch(authentication.actions.updateToken(token))

        return firebase.auth().signInWithCustomToken(token).catch(error => {
          console.error('Error code: ', error.code)
          console.error('Error message: ', error.message)
        })
      }).then(result => {
        console.log('Success authentication')
        console.log(result)
      })
    }
  }
}
