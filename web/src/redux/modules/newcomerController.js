import * as newcomer from './newcomer'

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
  authenticate: (location) => (dispatch, getState, { firebase, cookies }) => {
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
        if (result.data.code === 'error') {
          dispatch(newcomer.actions.finishSignIn({ result: 'ng' }))
          return
        }

        console.log('call here?')

        dispatch(newcomer.actions.receiveAuthentication(result.data))

        const token = result.data.token

        // Save the api token to the user's cookie.
        cookies.set('token', token, { secure: process.env.NODE_ENV === 'production', expires: 30 })

        return firebase.auth().signInWithCustomToken(token).catch(error => {
          console.error('Error code: ', error.code)
          console.error('Error message: ', error.message)
        })
      }).then(result => {
        if (result) {
          console.log('Success authentication')
          console.log(result)

          dispatch(newcomer.actions.finishSignIn({ result: 'ok' }))
        }
      })
    }
  },

  /**
   * [Async] Slack の招待リンクを取得する
   * @returns {Function}
   */
  fetchSlackUrlIfNeeded: () => (dispatch, getState, { firebase }) => {
    const screenSlack = getState().screenSlack || {}
    if (!screenSlack.result) {
      dispatch(newcomer.actions.requestSlackUrl())

      firebase.functions().httpsCallable('getSlackUrl')({})
        .then(result => {
          dispatch(newcomer.actions.receiveSlackUrl(result.data))
        })
        .catch(err => {
          dispatch(newcomer.actions.receiveSlackUrl({ error: true }))
          console.error(err)
        })
    }
  }
}
