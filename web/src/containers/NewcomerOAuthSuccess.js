import React from 'react'
import { connect } from 'react-redux'

class NewcomerOAuthSuccess extends React.Component {
  render() {
    // noinspection HtmlDeprecatedAttribute
    return (
      <div>
        <p>Success.</p>

        <div>
          <a href="http://nav.cx/87iSP2h">
            <img src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加" height="36" border="0"/>
          </a>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  return {}
})(NewcomerOAuthSuccess)
