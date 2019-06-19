import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

import Newcomer from './containers/Newcomer'
import NewcomerCallback from './containers/NewcomerCallback'
import NoMatch from './components/NoMatch'

import configureStore from './configureStore'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/newcomer/o-auth-callback/" component={NewcomerCallback}/>
        <Route path="/newcomer/:student_id/" component={Newcomer}/>
        <Route component={NoMatch}/>
      </Switch>
    </Router>
  </Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
