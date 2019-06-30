import React from 'react'
import { connect } from 'react-redux'

import ScreenShotLine from '../images/screen-shot-line.jpg'

class NewcomerOAuthSuccess extends React.Component {
  componentDidMount() {
    document.title = '友だち追加 - チャレキャラ'
  }

  render() {
    return (
      <div className='newcomer-content'>
        <div className="container">
          <div className='row'>
            <h2>友だち追加</h2>
          </div>

          <div className='row'>
            <p>LINE公式アカウント『チャレキャラ連絡網』を友だち追加して、URLをクリックしてください。</p>
          </div>
        </div>

        <img src={ScreenShotLine} className='img-fluid' alt='Screen shot'/>

        <div className="container mt-3">
          <div className='row'>
            <p>
              『チャレキャラ連絡網』はこちら。
            </p>
          </div>

          <div className='row'>
            <a className='btn btn-line-style btn-block' role="button" aria-disabled="true" href='http://nav.cx/87iSP2h'>
              友だち追加
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
