'use strict';

import React from 'react';
import { ReactHeader } from './header.js';

module.exports.Privacy = React.createClass({
  render: function() {
    return (
      <div>
        <ReactHeader title='StreetlivesNYC'
                     url='http://beta.streetlives.nyc'
                     location={this.props.location}/>
        <div className="StaticPage">
         <h2 className="StaticPage-title">Privacy</h2>
         <p>
           Users retain full rights to their stories and images. StreetlivesNYC and its creators will not exploit posts for any personal or corporate financial benefit. Posts can be anonymous or known, but please do not give full names of others. Posts are moderated, but not edited, we will not publish hate speech.
         </p>

        </div>
      </div>
    )
  }
})
