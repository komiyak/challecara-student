import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import 'App.scss'

import * as newcomer from './redux/modules/newcomer'

class App extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    studentId: PropTypes.string,
    studentName: PropTypes.string,
    url: PropTypes.string
  };

  componentDidMount() {
    this.props.dispatch(newcomer.fetchStudent(this.props.match))
  }

  render() {
    return (
      <div className="App container">
        <h1 className="title">Challecara!</h1>

        <div className="content">
          <p>チャレキャラ2019へようこそ！</p>
          <p>
            <strong>あなたのお名前</strong><br/>
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
    )
  }
}

export default connect(state => {
  const scene1 = state.newcomer.scene1 || {}
  const student = scene1.student || {}
  const studentField = student.fields || {}
  const oAuthUrl = scene1.oAuthUrl || {}

  return {
    isFetching: scene1.isFetching ? scene1.isFetching : false,
    studentId: student.id ? student.id : null,
    studentName: studentField.fullName ? studentField.fullName : null,
    url: oAuthUrl.url ? oAuthUrl.url : null
  }
})(App)
