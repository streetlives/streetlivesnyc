var ReactMap = React.createClass({

    getInitialState() {
        const model = new Backbone.Model({
            marker: null
        });

        const geocoder = new google.maps.Geocoder();

        const offerings = new Offerings();
        offerings.fetch();

        const addLocation = new Button({ title: 'Add Location' });
        addLocation.bind('click', this._onClickAddLocation, this);

        return {
            model: model,
            geocoder: geocoder,
            offerings: offerings,
            addLocation: addLocation,
            viz: {
                templateURL: '//<%- username %>.cartodb.com/api/v2/viz/<%-id %>/viz.json'
            },
            mapOptions: {
                center: [40.74442, -73.970],
                zoom: 13,
                https: true,
                zoomControl: true,
                scrollwheel: true,
                loaderControl: true,
                search: false,
                shareable: false
            },
            style: {
                marker: {
                    radius: 7,
                    fillColor: '#F05658',
                    color: '#FFFFFF',
                    weight: 1.5,
                    opacity: 0.9,
                    fillOpacity: 1
                }
            }
        }
    },

    componentDidMount() {
        var url = this._getVizJSONURL();
        var options = this.state.mapOptions;

        cartodb.createVis('map', url, options).done(this._onVisLoaded);
    },

    _onVisLoaded(vis, layers) {
        console.log("loaded!");
        var layer = layers[1];
        layer.setInteraction(true);
        var query = "SELECT l.*, string_agg(o.name, ', ') as offerings " +
            "FROM locations AS l " +
            "LEFT OUTER JOIN locations_offerings AS lo ON lo.location_id = l.cartodb_id " +
            "LEFT OUTER JOIN offerings as o ON o.cartodb_id = lo.offering_id " +
            "GROUP BY l.cartodb_id";
        layer.setQuery(query);

        //TODO: fix these
        layer.on('mouseover',    this._onMouseOver);
        layer.on('mouseout',     this._onMouseOut);
        layer.on('featureClick', this._onFeatureClick);

        var sublayer = layer.getSubLayer(0);
        sublayer.setInteraction(true);
        sublayer.setInteractivity('cartodb_id, name, description, offerings, address');

        //TODO: fix this
        sublayer.on('featureClick', function(e, latlng, pos, data) {
            e.preventDefault();
            e.stopPropagation();
        });

        this.map = vis.getNativeMap();

        //TODO: fix this
        this.map.on('click', this._onClickMap);
    },

    _onClickMap: function(e) {
        var geocoder = this.state.geocoder;
        var _onFinishedGeocoding = this._onFinishedGeocoding;
        this.t = setTimeout(function()  {
            var coordinates = [e.latlng.lat, e.latlng.lng];
            var latLng = new google.maps.LatLng(coordinates[0], coordinates[1]);

            geocoder.geocode({ 'latLng': latLng }, function(results, status) {
                _onFinishedGeocoding(coordinates, null, results, status);
            });
        }, 250);
    },

    _onFinishedGeocoding: function(coordinates, place, results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results && results.length > 0) {
                var address = results[0].formatted_address;
                var name = place ? place.name : null;
                this.state.model.set({ name: name, coordinates: coordinates, address: address });
                this._addMarker(coordinates);
            }
        }
    },

    _addMarker: function(coordinates) {
        var style = this.state.style.marker;
        var template = JST['sources/templates/popup.jst.ejs'];

        var content = template({
            name: this.state.model.get('name'),
            address: this.state.model.get('address' )
        });

        this.popup = SL.Popup({ autoPanPaddingTopLeft: [10, 75], offset: [0, -5] })
            .setLatLng(coordinates)
            .setContent(content)
            .openOn(this.map);

        var self = this;

        this.popup.on('close', function() {
            self.map.removeLayer(self.currentMarker);
        });

        this.currentMarker = L.circleMarker(coordinates, style);
        this.currentMarker.addTo(this.map);
        this.state.addLocation.show();
    },

    _gotoPlace: function(place) {
        var coordinates = [place.geometry.location.lat(), place.geometry.location.lng()];
        var latLng = new google.maps.LatLng(coordinates[0], coordinates[1]);

        var self = this;

        this.state.geocoder.geocode({ 'latLng': latLng }, function(results, status) {
            self._onFinishedGeocoding(coordinates, place, results, status);
        });

        this.map.panTo(coordinates);

        setTimeout(function() {
            self.map.setZoom(17);
            self._addMarker(coordinates);
        }, 500);
    },


    _getVizJSONURL() {
        var tpl = _.template(this.state.viz.templateURL);

        return tpl({
            id: window.Config.map_id,
            username: window.Config.username
        });
    },

    render() {
        return (
            <div>
                <div id="map" className="Map"></div>
                <ReactSearch gotoPlace={this._gotoPlace}/>
            </div>
        )
    }

});