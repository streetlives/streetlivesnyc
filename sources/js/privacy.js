'use strict';

import React from 'react';
import { ReactHeader } from './header.js';

module.exports.Privacy = React.createClass({
  render: function() {
    return (
      <div>
        <ReactHeader title='StreetlivesNYC'
                     url='http://beta.streetlives.nyc'/>
        <div>Privacy</div>
      </div>
    )
  }
})
