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

                <div className="HeaderItems">
                  <div className="HeaderItem">
                      <IndexLink to='/'
                            className="HeaderItem-link js-item js-map"
                            activeClassName="HeaderItem-link js-item js-map is-selected">
                            Map
                      </IndexLink>
                  </div>
                  <div className="HeaderItem">
                      <Link to='/about'
                            className="HeaderItem-link js-item js-about"
                            activeClassName="HeaderItem-link js-item js-about is-selected">
                            About
                      </Link>
                  </div>
                  <div className="HeaderItem">
                      <Link to='/privacy'
                            className="HeaderItem-link js-item js-privacy"
                            activeClassName="HeaderItem-link js-item js-privacy is-selected">
                            Privacy
                      </Link>
                  </div>
                </div>
            </header>
        )
    }
});
