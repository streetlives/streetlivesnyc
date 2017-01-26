import { GEOCODE_REQUEST, GEOCODE_RESPONSE,
         ADD_LOCATION_CLICKED, ADD_LOCATION_CANCELLED} from '../actions/geocodeActions'

const initialState = {
    coords: [],
    address: null,
    showAddLocation: false
}

const geocode = (state=initialState, action) => {
    switch (action.type) {
        case GEOCODE_REQUEST:
            return Object.assign({}, state, {coords: action.coords})
        case GEOCODE_RESPONSE:
            return Object.assign({}, state, {address: action.address, showAddLocation: true})
        case ADD_LOCATION_CLICKED:
            return Object.assign({}, state, {showAddLocation: false})
        case ADD_LOCATION_CANCELLED:
            return Object.assign({}, state, {address: null, showAddLocation: false})
        default:
            return state
    }
}

export default geocode

