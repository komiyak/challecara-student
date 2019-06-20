import { createSlice } from 'redux-starter-kit'

/**
 * /newcomer 画面に関連する state
 * newcomer.screen1 .. QRコード読み取り直後の画面でのみ利用するデータ
 * newcomer.screen2 .. LINE Login コールバック後の画面でのみ利用するデータ
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
    },
    finishSignIn(state, action) {
      state.screen2 = state.screen2 || {}

      state.screen2.finished = true
    }
  }
})

const { reducer } = newcomer
export const { actions } = newcomer
export default reducer
