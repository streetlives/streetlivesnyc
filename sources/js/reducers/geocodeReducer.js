import { GEOCODE_REQUEST, GEOCODE_RESPONSE } from '../actions/geocodeActions'

const initialState = {
    coords: [],
    address: null
}

const geocode = (state=initialState, action) => {
    switch (action.type) {
        case GEOCODE_REQUEST:
            return Object.assign({}, state, {coords: action.coords})
        case GEOCODE_RESPONSE:
            return Object.assign({}, state, {address: action.address})
        default:
            return state
    }
}

export default geocode

