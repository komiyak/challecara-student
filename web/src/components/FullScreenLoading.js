import React from 'react'
import spinning from '../images/spinning-circles.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

/**
 * @param props.text (optional) ローディングテキスト
 * @param props.errorMessage (optional) エラーメッセージ
 */
const FullScreenLoading = props => {
  if (props.errorMessage) {
    return (
      <div className='d-flex flex-column justify-content-center h-100 p-3'>
        <div className='container-fluid'>
          <div className='row justify-content-center'>
            <p style={{ color: 'white' }}><FontAwesomeIcon icon={faExclamationTriangle}/> {props.errorMessage}</p>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='d-flex flex-column justify-content-center h-100 p-3'>
        <div className='container-fluid'>
          <div className='row justify-content-center'>
            <img src={spinning} width='80px' alt='Spinning'/>
          </div>
          <div className='row justify-content-center mt-2'>
            <p style={{ color: 'white' }}>{props.text}...</p>
          </div>
        </div>
      </div>
    )
  }
}

export default FullScreenLoading
