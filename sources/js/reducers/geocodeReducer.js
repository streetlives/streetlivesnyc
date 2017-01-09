import { GEOCODE_REQUEST, GEOCODE_RESPONSE } from '../actions/geocodeActions'

const initialState = {
    coords: [],
    address: null
}

const geocode = (state=initialState, action) => {
    switch (action.type) {
        case GEOCODE_REQUEST:
            console.log('Initiating geocode')
            console.log(action)
            return Object.assign({}, state, {coords: action.coords})
        case GEOCODE_RESPONSE:
            console.log('Received geocode response')
            console.log(action)
            return Object.assign({}, state, {address: action.address})
        default:
            return state
    }
}

export default geocode

