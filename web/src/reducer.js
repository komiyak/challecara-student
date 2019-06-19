import { combineReducers } from 'redux'
import newcomer from './redux/modules/newcomer'
import authentication from './redux/modules/authentication'

const reducer = combineReducers({
  authentication,
  newcomer
})

export default reducer
