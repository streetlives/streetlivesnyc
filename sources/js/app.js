'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactMap } from './map.js';
import { ReactHeader } from './header.js';

import '../scss/reset.scss';
import '../scss/app.scss';
import '../scss/font.scss';
import '../scss/page.scss';

var ReactApp = React.createClass({

  render: function() {
    return (
        <div>
            <div>
                <ReactHeader title='StreetlivesNYC'
                             url='http://beta.streetlives.nyc'/>
            </div>
            <ReactMap />
        </div>
    )
  }
});

ReactDOM.render(<ReactApp />, document.getElementById('app'));

