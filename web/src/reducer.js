import { combineReducers } from 'redux'
import newcomer from './redux/modules/newcomer'
import requiredSignIn from './redux/modules/requiredSignIn'

const reducer = combineReducers({
  newcomer,
  requiredSignIn
})

export default reducer
