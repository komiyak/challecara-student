import React from 'react'
import { connect } from 'react-redux'

class NewcomerOAuthSuccess extends React.Component {
  render() {
    // noinspection HtmlDeprecatedAttribute
    return (
      <div className="container">
        <h2 className="title is-2">LINE公式アカウント『チャレキャラBot』を友だち追加してください</h2>

        <div className='content'>
          <p>
            『チャレキャラBot』にセットアップ用の URL が表示されますので、そちらをクリックしてください。
          </p>

          <hr/>
        </div>

        <h2 className='title is-2'>LINE公式アカウント『チャレキャラBot』を友だち追加する方法</h2>

        <div className='content'>
          <p>
            こちらから『チャレキャラBot』を友だち追加できます。
          </p>

          <div>
            <a href="http://nav.cx/87iSP2h">
              <img src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png" alt="友だち追加" height="36" border="0"/>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  return {}
})(NewcomerOAuthSuccess)
