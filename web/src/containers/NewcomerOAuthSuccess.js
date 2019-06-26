import React from 'react'
import { connect } from 'react-redux'

import ScreenShotLine from '../images/screen-shot-line.jpg'

class NewcomerOAuthSuccess extends React.Component {
  render() {
    return (
      <div className="container">
        <div className='row'>
          <h2>友だち追加</h2>
        </div>

        <div className='row'>
          <p>LINE公式アカウント『チャレキャラBot』を友だち追加して、URLをクリックしてください。</p>
        </div>

        <div className='row'>
          <img src={ScreenShotLine} className='img-fluid' alt='Screen shot'/>
        </div>

        <div className='row'>
          <p>
            『チャレキャラBot』はこちら。
          </p>
        </div>

        <div className='row'>
          <a className='btn btn-line-style btn-block' role="button" aria-disabled="true" href='http://nav.cx/87iSP2h'>
            友だち追加
          </a>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  return {}
})(NewcomerOAuthSuccess)
