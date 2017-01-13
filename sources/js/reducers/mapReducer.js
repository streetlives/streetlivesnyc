import { MAP_CLICKED, ADD_LOCATION_CLICKED, ADD_LOCATION_CANCELLED, LOCATION_SELECTED,
         SEARCH_RESULT_SELECTED, WELCOME_CLICKED, LOCATION_DISMISSED } from '../actions/mapActions'

function getInitialWelcomeDialog() {
    if (typeof(Storage) !== "undefined" &&
        sessionStorage.welcomeDialog) {
        return sessionStorage.welcomeDialog === "false" ? false : true;
    } else {
        return true;
    }
}

const initialState = {
    showWelcome: getInitialWelcomeDialog(),
    showAddLocation: false,
    activeCoords: [],
    showAddLocationInput: false,
    showLocationDetail: false,
    detailLocation: null,
    locationData: {} 
}

const map = (state=initialState, action) => {
    switch (action.type) {
        case WELCOME_CLICKED:
            if (typeof(Storage) !== "undefined") {
                sessionStorage.welcomeDialog = false;
            }
            return Object.assign({}, state, { showWelcome: false })
        case MAP_CLICKED:
            return Object.assign({}, state, { showAddLocation: true,
                                              activeCoords: action.coords })

        case ADD_LOCATION_CANCELLED:
            return Object.assign({}, state, { showAddLocation: false,
                                              activeCoords: [] })

        case ADD_LOCATION_CLICKED:
            return Object.assign({}, state, { showAddLocationInput: true,
                                              showAddLocation: false })
        case LOCATION_SELECTED:
            return Object.assign({}, state, { showLocationDetail: true,
                                              locationData: action.locationData })
        case LOCATION_DISMISSED:
            return Object.assign({}, state, { showLocationDetail: false, locationData: {}})
        case SEARCH_RESULT_SELECTED:
        default:
            return state
    }
}

export default map
