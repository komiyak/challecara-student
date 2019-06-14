import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import 'App.scss';

import {fetchStudentIfNeeded} from 'actions'

class App extends React.Component {
    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        studentId: PropTypes.string,
        studentName: PropTypes.string,
        url: PropTypes.string
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
                    <p><a className="buttonLineLogin" href={this.props.url ? this.props.url : ""}>LINE Login</a></p>
                </div>
                }

            </div>
        );
    }
}

export default connect(state => {
    // let pr = {
    //     isFetching: state.newcomer.scene1.isFetching ? state.newcomer.scene1.isFetching : false,
    //     studentId: state.newcomer.scene1.student.id,
    //     studentName: state.newcomer.scene1.student.name,
    //     url: state.newcomer.oAuthUrl
    // };
    // console.log('Prop is: ', pr);
    // return pr;

    return {isFetching: false};
})(App);
