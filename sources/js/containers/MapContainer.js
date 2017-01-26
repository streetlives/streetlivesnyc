import { connect } from 'react-redux'
import { welcomeClicked, 
         locationSelected, locationDismissed } from '../actions/mapActions'
import { geocode, addLocationClicked, addLocationCancelled } from '../actions/geocodeActions'

import { StreetlivesMap } from '../components/map.js';

const mapStateToProps = (state) => {
    return {
        isMobile: state.map.isMobile,
        showWelcome: state.map.showWelcome,
        showAddLocation: state.geocode.showAddLocation,
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
