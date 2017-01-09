'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import MapContainer from './containers/MapContainer'
import { Categories } from './components/categories.js';
import { LocationInformation } from './components/locationInformation.js';
import { Header } from './components/header.js';
import { About} from './components/about.js';
import { Privacy } from './components/privacy.js';
import { ContentGuidelines } from './components/guidelines.js';
import { TermsOfService } from './components/tos.js';

import mapReducer from './reducers/mapReducer'
import geocodeReducer from './reducers/geocodeReducer'
import { Provider, connect } from 'react-redux';
import { createStore, compose, combineReducers, bindActionCreators, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import '../scss/reset.scss';
import '../scss/app.scss';
import '../scss/font.scss';
import '../scss/page.scss';

const rootReducer = combineReducers({
    routing: routerReducer,
    map: mapReducer,
    geocode: geocodeReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const history = syncHistoryWithStore(browserHistory, store);

const App = React.createClass({
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

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={MapContainer} />
                <Route path="about" component={About} />
                <Route path="privacy" component={Privacy} />
                <Route path="tos" component={TermsOfService} />
                <Route path="guidelines" component={ContentGuidelines} />
                <Route path="categories" component={Categories} />
                <Route path="map" component={MapContainer} />
            </Route>
        </Router>
    </Provider>
  , document.getElementById('app'));
