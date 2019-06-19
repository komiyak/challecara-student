import React from 'react'
import { connect } from 'react-redux'

import { newcomerController } from '../redux/modules/newcomerController'

class NewcomerCallback extends React.Component {
  componentDidMount() {
    this.props.dispatch(newcomerController.authenticate(this.props.location))
  }

  render() {
    return (
      <div>
        <p>Backed to the app from LINE. Under construction.</p>
      </div>
    )
  }
}

export default connect(state => {
  return {}
})(NewcomerCallback)
