import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'

import { authenticationController } from '../redux/modules/authenticationController'

class RequiredSignIn extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    url: PropTypes.string
  }

  componentDidMount() {
    document.title = 'ログインしてください'

    document.documentElement.style.height = '100%'
    document.documentElement.style.background = '#e8e8e8'
    document.body.style.height = '100%'
    document.body.style.background = '#e8e8e8'

    this.props.dispatch(authenticationController.fetchOAuthUrlInRequiredSignIn(this.props.match))
  }

  componentWillUnmount() {
    document.documentElement.style.height = 'initial'
    document.documentElement.style.background = 'initial'
    document.body.style.background = 'initial'
    document.body.style.height = 'initial'
  }

  render() {
    let button
    if (this.props.isFetching) {
      button = <button className='btn btn-line-style btn-block' disabled>
        <FontAwesomeIcon icon={faSpinner} pulse/>
      </button>
    } else {
      button = <a className='btn btn-line-style btn-block' role="button" aria-disabled="true" href={this.props.url}>
        LINEでログイン
      </a>
    }

    return <div className='d-flex flex-column justify-content-center h-100 p-2'>
      <div>
        <p><FontAwesomeIcon icon={faInfoCircle}/> このページの閲覧にはログインが必要です。</p>
      </div>
      <div>
        {button}
      </div>
    </div>
  }
}

export default connect(state => {
  const requiredSignIn = state.requiredSignIn || {}
  const oAuthUrl = requiredSignIn.oAuthUrl || {}

  return {
    isFetching: requiredSignIn.isFetching ? requiredSignIn.isFetching : false,
    url: oAuthUrl.url ? oAuthUrl.url : null
  }
})(RequiredSignIn)
