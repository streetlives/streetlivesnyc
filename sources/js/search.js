'use strict';

import React from 'react';
import { Locations } from './models.js';
import { Typeahead } from 'react-typeahead';
import _ from 'lodash';

import '../scss/search.scss';

module.exports.Search = React.createClass({
    focus: function() {
      var self = this;

      setTimeout(function() {
        self.refs.searchBar.focus();
      }, 500);
    },

    getInitialState: function() {
        return {searchQuery: '', locationData: {}};
    },

    initAutoComplete: function() {
      var input = this.refs.searchBar;

      this.autocomplete = new google.maps.places.Autocomplete(input, {
        componentRestrictions: { country: 'USA' }
      });

      google.maps.event.addListener(this.autocomplete, 'place_changed', this.onPlaceChange);
    },

    onPlaceChange: function() {

      var place = this.autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        return;
      }

      this.props.gotoPlace(place);
    },

    updateInputState: function(e) {
        this.setState({searchQuery: e.target.value});
        var event = new Event('change');
        this.refs.searchBar.dispatch(event);
    },

    componentDidMount: function() {
        this.initAutoComplete();
        this.focus();

        var locationModel = new Locations();
        var self = this;

        locationModel.fetch().done(function(data) {
            var dataDict = _.keyBy(data.rows, 'name');
            self.setState({locationData: dataDict});
            console.log(dataDict);
        });
    },

    render: function() {
        return (
            <div className='InputField SearchField'>
                <input onChange={this.updateInputState} value={this.state.searchQuery} type='text' placeholder='Search' ref="searchBar" className="Input SearchInput js-field" />
            <Typeahead options={_.keys(this.state.locationData)} maxVisible={2}/>
            </div>
        )
    }
});
