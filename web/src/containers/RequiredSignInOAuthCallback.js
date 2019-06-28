import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import FullScreenLoading from '../components/FullScreenLoading'
import { authenticationController } from '../redux/modules/authenticationController'

class RequiredSignInOAuthCallback extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    authorized: PropTypes.bool.isRequired,
    callbackPath: PropTypes.string
  }

  componentDidMount() {
    document.title = '認証中 - チャレキャラ'

    document.documentElement.style.height = '100%'
    document.documentElement.style.background = '#888'
    document.body.style.height = '100%'
    document.body.style.background = '#888'

    this.props.dispatch(authenticationController.authenticateInRequiredSignIn(this.props.location))
  }

  componentWillUnmount() {
    document.documentElement.style.height = 'initial'
    document.documentElement.style.background = 'initial'
    document.body.style.background = 'initial'
    document.body.style.height = 'initial'
  }

  render() {
    if (this.props.authorized && !this.props.isFetching) {
      if (this.props.callbackPath) {
        return <Redirect to={this.props.callbackPath} />
      } else {
        return <Redirect to='/'/>
      }
    } else {
      return <FullScreenLoading text={'認証中'}/>
    }
  }
}

export default connect(state => {
  const screenCallback = state.requiredSignIn.screenCallback || {}
  const authentication = screenCallback.authentication || {}

  return {
    isFetching: !!screenCallback.isFetching,
    authorized: authentication.code === 'ok',
    callbackPath: authentication.callbackPath
  }
})(RequiredSignInOAuthCallback)
