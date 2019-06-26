import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { newcomerController } from '../redux/modules/newcomerController'

const $ = window.jQuery

class Newcomer extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    studentId: PropTypes.string,
    studentName: PropTypes.string,
    url: PropTypes.string
  };

  componentDidMount() {
    document.body.classList.add('cover-dark-mode')

    this.props.dispatch(newcomerController.fetchStudent(this.props.match))

    this.$el = $(this.el)
    this.$el.vegas({
      slides: [
        { src: 'https://s3-us-west-2.amazonaws.com/dev.komiyak.com/challecara-student-app/slideshow/photo01.jpg' },
        { src: 'https://s3-us-west-2.amazonaws.com/dev.komiyak.com/challecara-student-app/slideshow/photo02.jpg' },
        { src: 'https://s3-us-west-2.amazonaws.com/dev.komiyak.com/challecara-student-app/slideshow/photo03.jpg' },
        { src: 'https://s3-us-west-2.amazonaws.com/dev.komiyak.com/challecara-student-app/slideshow/photo04.jpg' }
      ],
      overlay: 'https://s3-us-west-2.amazonaws.com/dev.komiyak.com/challecara-student-app/slideshow/overlays/07.png'
    })
  }

  componentWillUnmount() {
    document.body.classList.remove('cover-dark-mode')

    this.$el.vegas('destroy')
  }

  render() {
    let studentName
    if (this.props.isFetching) {
      studentName = <span className='white-font-base'><FontAwesomeIcon icon={faSpinner} pulse/> Loading...</span>
    } else {
      studentName = <span className='white-font-base'>ようこそ、{this.props.studentName}</span>
    }

    return (
      <div className='component-root'>
        <div ref={el => this.el = el} className='full-height-background'/>

        <div className="component-body">
          <div className='cover-container d-flex w-100 h-100 p-3 mx-auto flex-column App'>
            <header className='mb-auto container-fluid'>
              <div className='row justify-content-center'>
                <h1 className="logo text-center m-5">チャレキャラ</h1>
              </div>

              <div className='row justify-content-center'>
                <h2 className="cover-heading">
                  To a maker
                </h2>
              </div>
            </header>

            <main className='container'>
              <div className="row justify-content-center mt-5">
                {studentName}
              </div>

              <div className="row justify-content-center mt-1">
                <a className={'btn btn-line-style btn-block ml-4 mr-4' + (this.props.isFetching ? ' disabled' : '')} role="button" aria-disabled="true" href={this.props.url ? this.props.url : ''}>LINEでログイン</a>
              </div>
            </main>

            <footer className='mt-auto p-5'>
            </footer>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  const screen1 = state.newcomer.screen1 || {}
  const student = screen1.student || {}
  const studentField = student.fields || {}
  const oAuthUrl = screen1.oAuthUrl || {}

  return {
    isFetching: screen1.isFetching ? screen1.isFetching : false,
    studentId: student.id ? student.id : null,
    studentName: studentField.fullName ? studentField.fullName : null,
    url: oAuthUrl.url ? oAuthUrl.url : null
  }
})(Newcomer)
