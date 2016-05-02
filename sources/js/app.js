'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { ReactMap } from './map.js';
import { ReactHeader } from './header.js';
import { Router, Route, browserHistory } from 'react-router';
import { About} from './about.js';
import { Privacy } from './privacy.js';

import '../scss/reset.scss';
import '../scss/app.scss';
import '../scss/font.scss';
import '../scss/page.scss';

var ReactApp = React.createClass({

  render: function() {
    return (
        <div>
            <ReactHeader title='StreetlivesNYC'
                         url='http://beta.streetlives.nyc'
                         location={this.props.location}/>
            <ReactMap />
        </div>
    )
  }
});

ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={ReactApp} />
      <Route path="/about" component={About} />
      <Route path="/privacy" component={Privacy} />
    </Router>
  , document.getElementById('app'));
