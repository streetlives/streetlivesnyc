import { connect } from 'react-redux'
import { welcomeClicked, mapClicked, addLocationClicked, addLocationCancelled,
         locationSelected, locationDismissed } from '../actions/mapActions'
import { geocode } from '../actions/geocodeActions'

import { StreetlivesMap } from '../components/map.js';

const mapStateToProps = (state) => {
    return {
        showWelcome: state.map.showWelcome,
        showAddLocation: state.map.showAddLocation,
        showAddLocationInput: state.map.showAddLocationInput,
        activeCoords: state.map.activeCoords,
        showLocationDetail: state.map.showLocationDetail,
        detailLocation: state.map.detailLocation,
        locationData: state.map.locationData,
        placeName: state.geocode.name,
        address: state.geocode.address
    } 
}

const mapDispatchToProps = (dispatch) => {
    return {
        welcomeClicked:() => {
            dispatch(welcomeClicked())
        },

        mapClicked:(coords) => {
            dispatch(mapClicked(coords))
            dispatch(geocode(coords))
        },

        addLocationClicked:() => {
            dispatch(addLocationClicked())
        },

        locationSelected: (locationData) => {
            dispatch(locationSelected(locationData))
        },

        locationDismissed:() => {
            dispatch(locationDismissed())
        },

        addLocationCancelled:() => {
            dispatch(addLocationCancelled())
        },
    } 
}

const MapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(StreetlivesMap)

export default MapContainer
