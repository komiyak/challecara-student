import React from 'react'
import { connect } from 'react-redux'

import CheckmarkIcon from '../components/CheckmarkIcon'

import CompletionHeader from '../images/newcomer-completion-header.jpg'

class NewcomerCompletion extends React.Component {
  componentDidMount() {
    document.title = 'セットアップが完了しました - チャレキャラ'
  }

  render() {
    return (
      <div>
        <img src={CompletionHeader} className='img-fluid w-100' alt='Header'/>

        <div className="newcomer-content">
          <div className="newcomer-content container">
            <div className='row'>
              <p>セットアップが完了しました！</p>
            </div>

            <div className='row'>
              <ul className='list-unstyled ml-1'>
                <li className='mb-1'><CheckmarkIcon/> ユーザー登録した。</li>
                <li className='mb-1'><CheckmarkIcon/> 『チャレキャラ連絡網』 を友だちに追加した。</li>
                <li><CheckmarkIcon/> Slack に参加した。</li>
              </ul>
            </div>

            <div className='row'>
              <p>これから半年間よろしくお願いします！</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  return {}
})(NewcomerCompletion)
