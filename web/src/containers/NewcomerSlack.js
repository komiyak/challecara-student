import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { newcomerController } from '../redux/modules/newcomerController'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt, faSpinner } from '@fortawesome/free-solid-svg-icons'

import SlackWithMentors from '../images/slack-with-mentors.jpg'

class NewcomerSlack extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    slackUrl: PropTypes.string
  };

  componentDidMount() {
    this.props.dispatch(newcomerController.fetchSlackUrlIfNeeded())
  }

  render() {
    let slackButton

    if (this.props.isFetching) {
      slackButton =
        <button type="button" className='btn btn-slack-style btn-block' disabled>
          <FontAwesomeIcon icon={faSpinner} pulse/> Loading...
        </button>
    } else if (this.props.slackUrl) {
      slackButton =
        <a className='btn btn-slack-style btn-block'
          role="button" aria-disabled="true"
          href={this.props.slackUrl}
          target="_blank" rel='noopener noreferrer'>

          Slack に参加 <FontAwesomeIcon icon={faExternalLinkAlt}/>
        </a>
    } else {
      slackButton =
        <button type="button" className='btn btn-slack-style btn-block' disabled>
          リンク取得に失敗しました
        </button>
    }

    return (
      <div className='newcomer-content'>
        <div className="container">
          <div className='row'>
            <h2>Slack に参加</h2>
          </div>
          <div className='row'>
            <p>
              Slack（スラック）は、 グループでの会話に便利なチャットツールです。
            </p>

            <p>
              IT業界で広く利用されており、チャレキャラでもすべての学生とメンターが Slack に参加しています。
            </p>
          </div>
        </div>

        <div className="text-center my-3">
          <img src={SlackWithMentors} className="rounded" alt="" style={{ maxWidth: '220px' }}/>
        </div>

        <div className='container'>
          <div className='row'>
            <h2>何に使うの？</h2>

          </div>
          <div className='row'>
            <p>
              学生同士、またはメンターとのコミュニケーションに活用してください。
              チャレキャラ開催期間中の連絡も、Slack で行われます。
            </p>
          </div>

          <div className='row'>
            {slackButton}
          </div>

          <div className='row mt-4'>
            <p>
              Slack に参加できたら、次に移動してください。
            </p>
          </div>

          <div className="row">
            <Link to="/newcomer/completion/" className='btn btn-outline-dark btn-block'>次へ</Link>
          </div>

        </div>
      </div>
    )
  }
}

export default connect(state => {
  const screenSlack = state.newcomer.screenSlack || {}
  const result = screenSlack.result || {}

  return {
    isFetching: screenSlack.isFetching ? screenSlack.isFetching : false,
    slackUrl: result.url ? result.url : null
  }
})(NewcomerSlack)
