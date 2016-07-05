'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { Map } from './map.js';
import { Header } from './header.js';
import { About} from './about.js';
import { Privacy } from './privacy.js';
import { ContentGuidelines } from './guidelines.js';
import { TermsOfService } from './tos.js';

import { Provider, connect } from 'react-redux';
import { createStore, compose, combineReducers, bindActionCreators } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import '../scss/reset.scss';
import '../scss/app.scss';
import '../scss/font.scss';
import '../scss/page.scss';

const defaultState = {
    someData: "is this working?"
};

const someDataReducer = function(state = [], action) {
    switch(action.type) {
        case 'AN_ACTION':
            console.log('action triggered!');
            return state;
        default:
            console.log('unknown action');
            return state;
    }
}

const rootReducer = combineReducers({
    someData: someDataReducer,
    routing: routerReducer
});

const store = createStore(rootReducer, defaultState);

const history = syncHistoryWithStore(browserHistory, store);

var Main = React.createClass({

  render: function() {
    return (
        <div>
            <Header title='StreetlivesNYC'
                         url='http://beta.streetlives.nyc'
                         location={this.props.location}/>
            {React.cloneElement(this.props.children, this.props)}
        </div>
    );
  }
});

function mapStateToProps(state) {
    return {
        someData: state.someData
    };
}

const actionCreators = {
    setLocationInformation: function (locationData) {
        return {
            type: 'SET_LOCATION_INFORMATION',
            data: locationData
        };
    },
    removeLocationInformation: function() {
        return {
            type: 'REMOVE_LOCATION_INFORMATION'
        };
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Map} />
                <Route path="about" component={About} />
                <Route path="privacy" component={Privacy} />
                <Route path="tos" component={TermsOfService} />
                <Route path="guidelines" component={ContentGuidelines} />
                <Route path="map" component={Map}>
                    <Route path="location-information" component={LocationInformation} />
                </Route>
            </Route>
        </Router>
    </Provider>
  , document.getElementById('app'));
