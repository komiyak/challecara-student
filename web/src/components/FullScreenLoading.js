import React from 'react'
import spinning from '../images/spinning-circles.svg'

/**
 * @param props.text ローディングテキスト
 */
const FullScreenLoading = props => {
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

export default FullScreenLoading
