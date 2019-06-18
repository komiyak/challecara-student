import React from 'react'
import { connect } from 'react-redux'

import * as newcomer from '../redux/modules/newcomer'

class NewcomerCallback extends React.Component {
  componentDidMount() {
    this.props.dispatch(newcomer.authenticate(this.props.location))
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
