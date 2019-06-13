import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {authenticate} from "../actions";

class NewcomerCallback extends React.Component {
    componentDidMount() {
        //this.props.

        console.log('NewcomerCallback#componentDidMount');
        this.props.dispatch(authenticate(this.props.location));
    }

    render() {
        return (
            <div>
                <p>Backed to the app from LINE. Under construction.</p>
            </div>
        );
    }
}

export default connect(state => {
    return {};
})(NewcomerCallback);
