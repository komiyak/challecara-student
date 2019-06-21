import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../sass/Newcomer.scss'

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
    this.$el.vegas('destroy')
  }

  render() {
    return (
      <div className='component-root'>
        <div ref={el => this.el = el} className='full-height-background'/>

        <div className="component-body">
          <div className='container App'>
            <h1 className="title">Challecara!</h1>

            <div className="content">
              <p>To a maker</p>
              <p>
                {this.props.isFetching
                  ? <span><i className="fas fa-spinner fa-pulse"/> Loading...</span> : this.props.studentName
                }
              </p>
            </div>

            {!this.props.isFetching &&
            <div>
              <div className="content">
                セットアップを開始しますので、LINE アカウントでログインをお願いします。
              </div>

              {/* eslint-disable-next-line */}
              <p><a className="buttonLineLogin" href={this.props.url ? this.props.url : ""}>LINE Login</a></p>
            </div>
            }
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
