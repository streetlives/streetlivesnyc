import { connect } from 'react-redux'
import { mapClicked, addLocationClicked, addLocationCancelled,
         locationSelected } from '../actions/mapActions'
import { Map } from '../components/map.js';

const mapStateToProps = (state) => {
    return {
        showAddLocation: state.showAddLocation,
        showAddLocationInput: state.showAddLocationInput,
        activeCoords: state.activeCoords,
        showLocationDetail: state.showLocationDetail,
        detailLocation: state.detailLocation
    } 
}

const mapDispatchToProps = (dispatch) => {
    return {
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
