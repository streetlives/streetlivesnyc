'use strict';

import React from 'react';
import { Link, IndexLink } from 'react-router';

import '../scss/header.scss';

module.exports.Header = React.createClass({

    render: function() {
        return (
            <header className="Header">
                <a href={this.props.url} className="HeaderTitle">
                    {this.props.title}
                </a>
            </header>
        )
    }
});
