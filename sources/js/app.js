'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactMap } from './map.js';
import { ReactHeader } from './header.js';

var ReactApp = React.createClass({

  render: function() {
    return (
        <div>
          <ReactMap />
          <div>
            <ReactHeader title='StreetlivesNYC'
                         url='http://beta.streetlives.nyc'/>
          </div>
        </div>
    )
  }
});

ReactDOM.render(<ReactApp />, document.getElementById('app'));

