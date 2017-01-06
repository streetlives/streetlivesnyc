import { connect } from 'react-redux'
import { welcomeClicked, mapClicked, addLocationClicked, addLocationCancelled,
         locationSelected } from '../actions/mapActions'
import { Map } from '../components/map.js';

const mapStateToProps = (state) => {
    return {
        showWelcome: state.map.showWelcome,
        showAddLocation: state.map.showAddLocation,
        showAddLocationInput: state.map.showAddLocationInput,
        activeCoords: state.map.activeCoords,
        showLocationDetail: state.map.showLocationDetail,
        detailLocation: state.map.detailLocation
    } 
}

const mapDispatchToProps = (dispatch) => {
    return {
        welcomeClicked:() => {
            dispatch(welcomeClicked())
        },

        mapClicked:(coords) => {
            dispatch(mapClicked(coords))
        },

        addLocationClicked:() => {
            dispatch(addLocationClicked())
        },

        locationSelected: (coords) => {
            dispatch(locationSelected(coords))
        },

        addLocationCancelled:() => {
            dispatch(addLocationCancelled())
        },
    } 
}

const MapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Map)

export default MapContainer
