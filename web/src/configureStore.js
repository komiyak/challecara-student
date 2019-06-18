import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'

import monitorReducersEnhancer from './redux/enhancers/monitorReducer'
import logger from 'redux-logger'

import reducer from './reducer'

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer,
    middleware: [logger, ...getDefaultMiddleware()],
    preloadedState,
    enhancers: [monitorReducersEnhancer]
  })

  // noinspection JSUnresolvedVariable
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducer.js', () => store.replaceReducer(reducer))
  }

  return store
}
