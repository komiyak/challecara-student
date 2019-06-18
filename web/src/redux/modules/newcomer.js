import { createSlice } from 'redux-starter-kit'

const newcomer = createSlice({
  slice: 'Newcomer',
  initialState: {},
  reducers: {
    requestStudent(state, action) {
      state.scene1 = state.scene1 || {}

      state.scene1.isFetching = true
    },
    receiveStudent(state, action) {
      state.scene1 = state.scene1 || {}

      state.scene1.student = action.payload
    },
    receiveOAuthUrl(state, action) {
      state.scene1 = state.scene1 || {}

      state.scene1.isFetching = false
      state.scene1.oAuthUrl = action.payload
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

const { reducer } = newcomer
export default reducer
