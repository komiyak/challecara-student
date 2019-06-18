import * as firebase from 'firebase/app'
import 'firebase/functions'

import { createSlice } from 'redux-starter-kit'

// NOTE 将来的には、オプションとして localhost の function を見れるようにしたい
firebase.initializeApp({
  apiKey: 'AIzaSyCuuDnt1RHqFrg9_9uT-b7IGwyXZNeVL5w',
  authDomain: 'challecara-student.firebaseapp.com',
  databaseURL: 'https://challecara-student.firebaseio.com',
  projectId: 'challecara-student',
  storageBucket: 'challecara-student.appspot.com',
  messagingSenderId: '202630578146',
  appId: '1:202630578146:web:a970db057cb8df40'
})

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
export const fetchStudent = match => (dispatch, getState) => {
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
