import { createSlice } from 'redux-starter-kit'

/**
 * /required-sign-in 画面に関連する state
 * requiredSignIn.screenCallback .. LINE Login コールバック後の画面に関するデータ
 */
const requiredSignIn = createSlice({
  slice: 'RequiredSignIn',
  initialState: {},
  reducers: {
    requestOAuthUrl(state, action) {
      state.isFetching = true
    },
    receiveOAuthUrl(state, action) {
      state.isFetching = false
      state.oAuthUrl = action.payload
    },
    requestAuthentication(state, action) {
      state.screenCallback = state.screenCallback || {}

      state.screenCallback.isFetching = true
    },
    receiveAuthentication(state, action) {
      state.screenCallback = state.screenCallback || {}

      state.screenCallback.authentication = action.payload
    },
    finishSignIn(state) {
      state.screenCallback = state.screenCallback || {}

      state.screenCallback.isFetching = false
    }
  }
})

const { reducer } = requiredSignIn
export const { actions } = requiredSignIn
export default reducer
