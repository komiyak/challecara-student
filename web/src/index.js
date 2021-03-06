import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

import RequiredSignIn from './containers/RequiredSignIn'
import RequiredSignInOAuthCallback from './containers/RequiredSignInOAuthCallback'
import Newcomer from './containers/Newcomer'
import NewcomerCallback from './containers/NewcomerCallback'
import NewcomerOAuthSuccess from './containers/NewcomerOAuthSuccess'
import NewcomerSlack from './containers/NewcomerSlack'
import NewcomerCompletion from './containers/NewcomerCompletion'
import NoMatch from './components/NoMatch'

import 'scss/index.scss'

import configureStore from './configureStore'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Redirect exact from='/newcomer/bot-callback/' to='/newcomer/slack/'/>
        <Route exact path="/required-sign-in/" component={RequiredSignIn}/>
        <Route exact path="/required-sign-in/o-auth-callback/" component={RequiredSignInOAuthCallback}/>
        <Route exact path='/newcomer/slack/' component={NewcomerSlack}/>
        <Route exact path="/newcomer/o-auth-callback/" component={NewcomerCallback}/>
        <Route exact path="/newcomer/o-auth-success/" component={NewcomerOAuthSuccess}/>
        <Route exact path="/newcomer/completion/" component={NewcomerCompletion}/>
        <Route path="/newcomer/:student_id/" component={Newcomer}/>
        <Route component={NoMatch}/>
      </Switch>
    </Router>
  </Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
