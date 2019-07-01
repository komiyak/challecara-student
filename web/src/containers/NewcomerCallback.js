import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { newcomerController } from '../redux/modules/newcomerController'

import FullScreenLoading from '../components/FullScreenLoading'

class NewcomerCallback extends React.Component {
  static propTypes = {
    finished: PropTypes.bool.isRequired,
    result: PropTypes.string
  }

  componentDidMount() {
    document.title = '認証中 - チャレキャラ'

    document.documentElement.style.height = '100%'
    document.documentElement.style.background = '#888'
    document.body.style.height = '100%'
    document.body.style.background = '#888'

    this.props.dispatch(newcomerController.authenticate(this.props.location))
  }

  componentWillUnmount() {
    document.documentElement.style.height = 'initial'
    document.documentElement.style.background = 'initial'
    document.body.style.background = 'initial'
    document.body.style.height = 'initial'
  }

  render() {
    if (this.props.finished) {
      if (this.props.result === 'ok') {
        return <Redirect to='/newcomer/o-auth-success/'/>
      } else {
        return <FullScreenLoading errorMessage={'このアカウントはすでに LINE 登録済みのため、処理を継続できません。'}/>
      }
    } else {
      return <FullScreenLoading text={'認証中'}/>
    }
  }
}

export default connect(state => {
  const screen2 = state.newcomer.screen2 || {}
  return {
    finished: !!screen2.finished,
    result: screen2.result
  }
})(NewcomerCallback)
