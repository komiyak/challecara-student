import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import 'App.scss';

import {fetchStudentIfNeeded} from 'actions'

class App extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        studentId: PropTypes.string,
        studentName: PropTypes.string
    };

    componentDidMount() {
        this.props.dispatch(fetchStudentIfNeeded(this.props.match));
    }

    render() {
        return (
            <div className="App container">
                <h1 className="title">Challecara!</h1>

                <div className="content">
                    <p>チャレキャラ2019へようこそ！</p>
                    <p>
                        <strong>あなたのお名前</strong><br/>
                        {this.props.isFetching ?
                            <span><i className="fas fa-spinner fa-pulse"/> Loading...</span> : this.props.studentName
                        }
                    </p>
                </div>

                {!this.props.isFetching &&
                <div>
                    <div className="content">
                        セットアップを開始しますので、LINE アカウントでログインをお願いします。
                    </div>

                    {/* eslint-disable-next-line */}
                    <p><a className="buttonLineLogin" href='#'>LINE Login</a></p>
                </div>
                }

            </div>
        );
    }
}

export default connect(state => {
    return {
        isFetching: state.newcomer.isFetching,
        studentId: state.newcomer.student && state.newcomer.student.id,
        studentName: state.newcomer.student && state.newcomer.student.name
    };
})(App);
