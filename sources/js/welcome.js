'use strict';

import React from 'react';

import '../scss/welcome.scss';

module.exports.Welcome = React.createClass({

    render: function() {
        return (
            <div className="Welcome Dialog">
                <div className="Welcome-inner Dialog-inner">
                    <div className="Welcome-content Dialog-content">
                        <div className="Welcome-title">
                            Welcome to StreetlivesNYC:
                        </div>
                        <div className="Welcome-subtitle">
                            Your city, your map, your voice. 
                        </div>
                        <div className="Welcome-message">
                            StreetlivesNYC is a map providing information for and from the
                            Homeless population of New York City. Look for what you need
                            or post what you know.
                        </div>
                        <footer className="Footer">
                            <button onClick={this.props.onClickOK} className="Button js-ok">
                                OK, thanks
                            </button>
                        </footer>
                    </div>
                </div>
            </div>
        )
    }
});

