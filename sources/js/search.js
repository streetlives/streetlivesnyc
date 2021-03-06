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
        this.setState({searchQuery: place.name});

        if (!place.geometry || !place.geometry.location) {
            return;
        }

        this.props.gotoPlace(place);
    },

    voiceSearch: function() {
        var recognition = new webkitSpeechRecognition();
        var self = this;

        recognition.onresult = function(event) {
            if (event.results) {
                self.setState({ searchQuery: event.results[0][0].transcript});
                self.focus();
            }
        };

        recognition.start();
    },

    componentDidMount: function() {
        this.initAutoComplete();
        this.focus();

        var locationModel = new Locations();
        var self = this;

        locationModel.fetch().done(function(data) {
            var dataDict = _.keyBy(data.rows, 'name');
            self.setState({locationData: dataDict});
        });
    },

    onSearchChange: function(event) {
        this.setState({searchQuery: event.target.value});
    },

    render: function() {
        return (
            <div className='InputField SearchField'>
                <input type='text' placeholder='Search' ref="searchBar" value={this.state.searchQuery}
                                   onChange={this.onSearchChange}
                                   className="Input SearchInput js-field" />
                <button className="microphone" onClick={this.voiceSearch}></button>
            </div>
        )
    }
});
