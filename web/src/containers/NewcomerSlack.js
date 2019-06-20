import React from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

class NewcomerSlack extends React.Component {
  render() {
    return (
      <div className="App container">
        <h1 className="title">Slack(スラック) に参加してください</h1>

        <h2 className="title is-2">Slack って？</h2>

        <div className="content">
          <p>
            グループでの会話に便利なチャットツールです。
            IT業界で一般的に利用されており、
            チャレキャラのすべての学生とメンターも Slack に参加しています。
          </p>
        </div>

        <h2 className="title is-2">Slack で何をするの？</h2>

        <div className="content">
          <p>
            学生同士、またはメンターとのコミュニケーションに活用してください。
            チャレキャラ開催期間中の連絡は、Slack を通して行われます。
          </p>
        </div>

        <h2 className="title is-2">参加方法</h2>

        <div className="content">
          <p>
            <a href='#' target="_blank">
              Slack に参加（別窓）
            </a>
          </p>

          <p>
            上記のボタンをクリックし、案内に従って登録を完了してください。
          </p>
        </div>

        <Link to="/newcomer/completion/" className='button'>次へ</Link>

      </div>
    )
  }
}

export default connect(state => {
  return {}
})(NewcomerSlack)
