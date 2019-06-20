import React from 'react'
import { connect } from 'react-redux'

import CheckmarkIcon from '../components/CheckmarkIcon'

class NewcomerCompletion extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="content">
          <p>
            おめでとうございます！
            セットアップが完了しました！
          </p>

          <ul>
            <li><CheckmarkIcon/> ユーザー登録した。</li>
            <li><CheckmarkIcon/> 『チャレキャラBot』 を友だちに追加した。</li>
            <li><CheckmarkIcon/> Slack に参加した。</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  return {}
})(NewcomerCompletion)
