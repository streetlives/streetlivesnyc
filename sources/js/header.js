import React from 'react';
import { Link } from 'react-router';

import '../scss/header.scss';

module.exports.ReactHeader = React.createClass({

    render: function() {
        return (
            <header className="Header">
                <a href={this.props.url} className="HeaderTitle">
                    {this.props.title}
                </a>

                <ul className="HeaderItems">
                  <li className="HeaderItem">
                      <Link to='/' className="HeaderItem-link is-selected js-item js-map">Map</Link>
                  </li>
                  <li className="HeaderItem">
                      <Link to='/about' className="HeaderItem-link js-item js-about">About</Link>
                  </li>
                  <li className="HeaderItem">
                      <Link to='/privacy' className="HeaderItem-link js-item js-privacy">Privacy</Link>
                  </li>
                </ul>
            </header>
        )
    }
});
