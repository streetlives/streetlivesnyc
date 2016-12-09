'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { Map } from './map.js';
import { Categories } from './categories.js';
import { LocationInformation } from './locationInformation.js';
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

const rootReducer = combineReducers({
    routing: routerReducer
});

const store = createStore(rootReducer);

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
                <IndexRoute component={Map} />
                <Route path="about" component={About} />
                <Route path="privacy" component={Privacy} />
                <Route path="tos" component={TermsOfService} />
                <Route path="guidelines" component={ContentGuidelines} />
                <Route path="categories" component={Categories} />
                <Route path="map" component={Map} />
            </Route>
        </Router>
    </Provider>
  , document.getElementById('app'));
