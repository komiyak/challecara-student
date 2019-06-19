import { createSlice } from 'redux-starter-kit'

/**
 * ユーザー認証情報の管理
 * authentication.token .. APIトークン
 */
const authentication = createSlice({
  slice: 'Authentication',
  initialState: {},
  reducers: {
    updateToken(state, action) {
      state.token = action.payload
    }
  }
})

const { reducer } = authentication
export const { actions } = authentication
export default reducer
