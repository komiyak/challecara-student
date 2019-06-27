import { configureStore } from 'redux-starter-kit'

import monitorReducersEnhancer from './redux/enhancers/monitorReducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import reducer from './reducer'

import * as firebase from 'firebase/app'
import 'firebase/functions'
import 'firebase/auth'

import cookies from 'js-cookie'

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

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer,
    middleware: [
      thunk.withExtraArgument({ firebase, cookies }),
      logger
    ],
    preloadedState,
    enhancers: [monitorReducersEnhancer]
  })

  // noinspection JSUnresolvedVariable
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducer.js', () => store.replaceReducer(reducer))
  }

  return store
}
