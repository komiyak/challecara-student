import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { newcomerController } from '../redux/modules/newcomerController'

class NewcomerCallback extends React.Component {
  static propTypes = {
    redirect: PropTypes.bool.isRequired
  }

  componentDidMount() {
    this.props.dispatch(newcomerController.authenticate(this.props.location))
  }

  render() {
    if (this.props.redirect) {
      return <Redirect to='/newcomer/o-auth-success/'/>
    } else {
      return (
        <div>
          <p>Backed to the app from LINE. Under construction.</p>
        </div>
      )
    }
  }
}

export default connect(state => {
  const screen2 = state.newcomer.screen2 || {}
  return {
    redirect: !!screen2.finished
  }
})(NewcomerCallback)
