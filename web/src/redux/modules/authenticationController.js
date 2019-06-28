import * as requiredSignIn from './requiredSignIn'

export const authenticationController = {
  /**
   * [Async] LINE Login の URL を取得する (画面: /required-sign-in 用)
   */
  fetchOAuthUrlInRequiredSignIn: match => (dispatch, getState, { firebase }) => {
    dispatch(requiredSignIn.actions.requestOAuthUrl())
    firebase.functions().httpsCallable('getOAuthUrl2')({ redirectUrl: process.env.REACT_APP_O_AUTH_CALLBACK_URL_FOR_REQUIRED_SIGN_IN })
      .then(result => {
        dispatch(requiredSignIn.actions.receiveOAuthUrl(result.data))
      })
  },

  /**
   * [Async] サーバー認証を実行する
   */
  authenticateInRequiredSignIn: location => (dispatch, getState, { firebase, cookies }) => {
    const queryString = require('query-string')
    const queries = queryString.parse(location.search)

    const code = queries.code
    const state = queries.state

    if (code && state) {
      dispatch(requiredSignIn.actions.requestAuthentication())

      firebase.functions().httpsCallable('authenticateWithLine2')({
        code,
        state,
        redirectUrl: process.env.REACT_APP_O_AUTH_CALLBACK_URL_FOR_REQUIRED_SIGN_IN
      }).then(result => {
        const token = result.data.token
        dispatch(requiredSignIn.actions.receiveAuthentication(result.data))

        // Save the api token to the user's cookie.
        cookies.set('token', token, { secure: process.env.NODE_ENV === 'production', expires: 30 })

        return firebase.auth().signInWithCustomToken(token).catch(error => {
          console.error('Error code: ', error.code)
          console.error('Error message: ', error.message)
        })
      }).then(result => {
        console.log('Success authentication')
        console.log(result)

        dispatch(requiredSignIn.actions.finishSignIn())
      })
    }
  }
}
