import React from 'react'
import { connect } from 'react-redux'

class NewcomerOAuthSuccess extends React.Component {
  render() {
    return (
      <div>
        <p>Success.</p>
      </div>
    )
  }
}

export default connect(state => {
  return {}
})(NewcomerOAuthSuccess)
