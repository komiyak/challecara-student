import React from 'react';

const NoMatch = ({location}) => (
    <div className='container'>
        <h1 className="title is-3">No match for <code>{location.pathname}</code></h1>
    </div>
);

export default NoMatch;
