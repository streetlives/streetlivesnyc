import React from 'react';
import { Link } from 'react-router';

import '../scss/header.scss';

module.exports.Header = React.createClass({

    getSelectedClassByUrl: function(url) {
      return this.props.location.pathname === url ? ' is-selected' : '';
    },

    render: function() {
      const mapSelected = this.getSelectedClassByUrl("/");
      const aboutSelected = this.getSelectedClassByUrl("/about");
      const privacySelected = this.getSelectedClassByUrl("/privacy");

        return (
            <header className="Header">
                <a href={this.props.url} className="HeaderTitle">
                    {this.props.title}
                </a>

                <ul className="HeaderItems">
                  <li className="HeaderItem">
                      <Link to='/' className={"HeaderItem-link js-item js-map" + mapSelected}>Map</Link>
                  </li>
                  <li className="HeaderItem">
                      <Link to='/about' className={"HeaderItem-link js-item js-about" + aboutSelected}>About</Link>
                  </li>
                  <li className="HeaderItem">
                      <Link to='/privacy' className={"HeaderItem-link js-item js-privacy" + privacySelected}>Privacy</Link>
                  </li>
                </ul>
            </header>
        )
    }
});
