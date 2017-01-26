import React from 'react';
import Backbone from 'backbone';
import { Map, CircleMarker, Popup, TileLayer, LayerGroup, FeatureGroup } from 'react-leaflet';

import AddLocationDialog from './dialogs/addLocationDialog.js'
import ThanksDialog from './dialogs/addLocationDialog.js'
import WelcomeDialog from './dialogs/welcomeDialog.js';

import { Offerings, Locations } from './models.js';
import { LocationInformation } from './locationInformation.js';
import { LocationForm } from './locationForm.js';
import { Search } from './search.js';

import '../../scss/map.scss';
import '../../scss/dialog.scss';
import '../../scss/like_button.scss';
import '../../scss/likes.scss';
import '../../scss/popup.scss';
import '../../scss/button.scss';

const markerFillColor = '#00AA85'

var GeoLocateButton = React.createClass({
    render: function() {
        return (
            <div className="GeoLocateButton" onClick={this.props.onClickGeolocate}>
                <img src="./img/AutoLocation.svg"></img>
            </div>
        )
    }
});

const StreetlivesPopup = L.Popup.extend({
  initialize: function (options, source) {
    this.options.className = 'Popup';
    L.setOptions(this, options);
        this._source = source;
  }
});

const SL = {
    Popup: function(options) {
        return new StreetlivesPopup(options);
    }
};

module.exports.StreetlivesMap = React.createClass({

    getInitialState() {
        const model = new Backbone.Model({
            marker: null
        });

        const geocoder = new google.maps.Geocoder();

        const offerings = new Offerings();
        offerings.fetch();

        return {
            model: model,
            locations: [],
            boundClickEvents: false,
            drawLocations: true,
            geocoder: geocoder,
            offerings: offerings,
            locationForm: false,
            thanksDialog: false,
            addLocationDialog: false
        }
    },

    componentWillMount() {
        this._fetchLocations();
    },

    componentDidUpdate() {
        if (this.state.locations.length && !this.state.boundClickEvents) {
            let locations = this.state.locations

            for (var i=0; i < locations.length; i++) {
                let nextLocation = locations[i]
                let nextMarker = this.refs[`location_${i}`]
                if (nextMarker) {
                    let nextLeaflet = nextMarker.leafletElement
                    nextLeaflet.on('click', () => {
                        this.props.locationSelected(nextLocation)
                    })
                }
            }

            this.setState({boundClickEvents: true})
        }
    },

    componentDidMount() {
        var options = this.state.mapOptions;

        var leafletMap = this.refs.map.leafletElement
        leafletMap.on('zoomstart', ()=> {
            this.setState({drawLocations: false})
        });

        leafletMap.on('zoomend', ()=> {
            this.setState({drawLocations: true})
        });
    },

    onClickMap: function(e) {
        var geocoder = this.state.geocoder;
        var onFinishedGeocoding = this.onFinishedGeocoding;
        this.props.mapClicked([e.latlng.lat, e.latlng.lng])
        this.t = setTimeout(function()  {
            var coordinates = [e.latlng.lat, e.latlng.lng];
            var latLng = new google.maps.LatLng(coordinates[0], coordinates[1]);

            geocoder.geocode({ 'latLng': latLng }, function(results, status) {
                onFinishedGeocoding(coordinates, null, results, status);
            });
        }, 250);
    },

    onFinishedGeocoding: function(coordinates, place, results, status) {
        if (!this.state.locationInformation && status === google.maps.GeocoderStatus.OK) {
            if (results && results.length > 0) {
                var address = results[0].formatted_address;
                var name = place ? place.name : null;
                this.state.model.set({ name: name, coordinates: coordinates, address: address });
                this._addMarker(coordinates);
            }
        }
    },

    _addMarker: function(coordinates) {
        if (this.props.isMobile) {
            this.setState({
                addLocationDialog: true
            });
        } else {
            var style = this.state.style.marker;
            var name = this.state.model.get('name');
            var nameString = name ? name + ', ' : '';
            var address = this.state.model.get('address');

            var content =
            '<p>' +
            '<strong class="Popup-addressName">' +
            nameString + address +
            '</strong>' +
            '<br/>' +
            'is not part of Streetlives yet. ' +
            'Do you want to add this location to the map?' +
            '</p>' +
            '<button class="Button Button--addLocationSmall js-add-location">' +
            'Add location' +
            '</button>';

            var panCoords = (this.props.isMobile) ? [0, 150] : [10, 75];
            this.popup = SL.Popup({ autoPanPaddingTopLeft: panCoords, offset: [0, -5] })
                           .setLatLng(coordinates)
                           .setContent(content)
                           .openOn(this.map);

            var self = this;

            this.popup.on('close', function() {
                self.map.removeLayer(self.currentMarker);
            });

            this.currentMarker = L.circleMarker(coordinates, style);
            this.currentMarker.addTo(this.map);

            /**
             * This element is INSIDE the content of the popup generated from the template. No better
             * ideas on how to attach the handler to it. Hopefully React/leaflet thing can help here.
             */
            $('.js-add-location').click(this.onClickAddLocation);

        }
    },

    onClickAddLocation: function(e) {
        this._killEvent(e);
        this.map.removeLayer(this.popup);

        this.setState({
            locationForm: true
        });
        console.log(this.state);
    },

    onClickAddLocationFromReactPopup: function(e) {
        this._killEvent(e);

        this.removeAddLocationDialog();
        this.setState({
            locationForm: true,
        });
        console.log(this.state);
    },


    _killEvent: function(e) {
        if (e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
        }
    },

    onKeyUp: function(e) {
        if (e.keyCode === 27) {
            this.map.closePopup();
        }
    },

    onAddLocation: function() {
        var marker = L.circleMarker(this.state.model.get('coordinates'), this.state.style.marker);

        marker.on('click', function() {
            console.log('click');
        });

        marker.addTo(this.map);

        this.setState({
            thanksDialog: true
        });

        this._removeCurrentSelection();
    },

    _removeCurrentSelection: function() {
        if (this.currentMarker) {
            this.map.removeLayer(this.currentMarker);
            this.state.model.set({ address: null });
            this.setState({
                locationForm: false
            });
        }
    },

    // TODO: move this into redux
    _fetchLocations() {
        var locationModel = new Locations();
        var self = this;
        locationModel.fetch({}).done(function(data) {
            self.setState({ locations: data.rows });
        });
    },

    _reconcileCoordinates(coordinates) {
        var locationModel = new Locations();
        var self = this;
        locationModel.fetch({data: $.param({ address: coordinates})}).done(function(data) {
            if (data.rows.length > 0) {
                self.setState({
                    locationInformation: data.rows[0]
                });
            } else {
                self._addMarker(coordinates);
            }
        });
    },

    _gotoPlace: function(place) {
        var coordinates = [place.geometry.location.lat(), place.geometry.location.lng()];
        var latLng = new google.maps.LatLng(coordinates[0], coordinates[1]);

        var self = this;
        this.map.panTo(coordinates);

        var model = this.state.model;
        setTimeout(function() {
            model.set({
                name: place.name,
                address: place.formatted_address
            });
            self._reconcileCoordinates(coordinates);
        }, 500);
    },

    removeLocationForm() {
        this.setState({
            locationForm: false
        })
    },

    removeLocationInformation(addedNewComment) {
        this.setState({
            locationInformation: null,
            thanksDialog: typeof(addedNewcomment) === 'boolean' ? addedNewComment : false
        })
    },

    renderLocationInformation() {
        if (this.props.showLocationDetail) {
            return (
                <LocationInformation options={this.props.locationData}
                                     onClickClose={this.props.locationDismissed} />
            )
        }
    },

    renderLocationForm() {
      if (this.state.locationForm) {
          return (
              <LocationForm onAddLocation={this.onAddLocation}
                            onClickCancel={this.removeLocationForm}
                            offerings={this.state.offerings}
                            name={this.state.model.get('name')}
                            coordinates={this.state.model.get('coordinates')}
                            address={this.state.model.get('address')}
              />
          )
      } else {
          return null;
      }
    },

    removeThanksDialog() {
        this.setState({
            thanksDialog: false
        })
    },

    renderThanksDialog() {
        if (this.state.thanksDialog) {
            return (
                <ThanksDialog onClickOk={this.removeThanksDialog}
                              onClickClose={this.removeThanksDialog}
                              title='Thank your for helping the community with your knowledge'
                              text=''
                              ok_button='Ok, thanks'/>
            )
        } else {
            return null;
        }
    },

    renderWelcomeDialog() {
        if (this.props.showWelcome) {
            return (
                <WelcomeDialog onClickOK={this.props.welcomeClicked}/>
            )
        } else {
            return null;
        }
    },

    removeAddLocationDialog() {
        this.setState({
            addLocationDialog: false
        })
    },

    renderAddLocationDialog() {
        if (this.props.showAddLocation) {
            var name = (this.props.placeName && this.props.placeName.length) ? 
                        `${this.props.placeName},` : ''
            var address = this.props.address
            return (<AddLocationDialog name={name} address={address} 
                                       onClickAddLocation={this.props.addLocationClicked}
                                       onClickClose={this.props.addLocationCancelled} />)
        }
    },

    _renderAddLocationDialog() {
        var name = this.state.model.get('name');
        var nameString = name ? name + ', ' : '';
        var address = this.state.model.get('address');

        if (this.state.addLocationDialog) {
            return (
                <AddLocationDialog name={nameString} address={address}
                                   onClickAddLocation={this.onClickAddLocationFromReactPopup}
                                   onClickClose={this.removeAddLocationDialog}/>
            )
        } else {
            return null;
        }
    },

    _onClickGeolocate: function() {
        if (navigator.geolocation) {
            let map = this.refs.map.leafletElement
            navigator.geolocation.getCurrentPosition(position => {
                map.panTo([position.coords.latitude, position.coords.longitude]);
                map.setZoom(16);
            });
        }
    },

    renderLocations() {
        var locations = this.state.locations;
        var renderedLocations = []
        if (!this.state.drawLocations) {
            return renderedLocations
        }

        var markerStyle = { radius: 7, fillColor: markerFillColor,
                            color: '#FFFFFF', weight: 1.5, opacity: 0.9, fillOpacity: 1 }
        if (this.props.isMobile) {
            markerStyle.radius = 15 
        }

        for (var i=0; i < locations.length; i++) {
            var nextLocation = locations[i]; 
            var nextMarker = <CircleMarker className='location-marker'
                                           ref={`location_${i}`} key={`locaiton-${i}`} {...markerStyle}
                                           center={[nextLocation.lat, nextLocation.long]} />
            renderedLocations.push(nextMarker)
        }
        return renderedLocations
    },

    render() {
        let mapOptions = { center: [40.74442, -73.970], zoom: 13, https: true,
                           zoomControl: true, scrollwheel: true, loaderControl: true,
                           search: false, shareable: false }
        let mapClicked = (e)=> { this.props.mapClicked(e.latlng) } 

        return (<div onkeyup={this.onKeyUp}>
                <Map onClick={mapClicked} {...mapOptions} ref="map" id="map" className="Map">
                   <TileLayer url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
                              attribution="&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>, &copy;<a href='https://carto.com/attribution'>CARTO</a>'"/>
                   <Search gotoPlace={this._gotoPlace}/>
                   {this.renderLocations()}
                </Map>
                {this.renderLocationForm()}
                {this.renderLocationInformation()}
                {this.renderThanksDialog()}
                {this.renderWelcomeDialog()}
                {this.renderAddLocationDialog()}
                <GeoLocateButton onClickGeolocate={this._onClickGeolocate}/>
            </div>)
    }

});
