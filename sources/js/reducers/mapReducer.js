import { MAP_CLICKED, ADD_LOCATION_CLICKED, ADD_LOCATION_CANCELLED, LOCATION_SELECTED, SEARCH_RESULT_SELECTED } from '../actions/mapActions'

const initialState = {
    showAddLocation: false,
    activeCoords: [],
    showAddLocationInput: false,
    showLocationDetail: false,
    detailLocation: null
}

const map = (state=initialState, action) => {
    switch (action.type) {
        case MAP_CLICKED:
            return Object.assign(state, {}, { showAddLocation: true,
                                              activeCoords: action.coords })

        case ADD_LOCATION_CANCELLED:
            return Object.assign(state, {}, { showAddLocation: false,
                                              activeCoords: [] })

        case ADD_LOCATION_CLICKED:
            return Object.assign(state, {}, { showAddLocationInput: true,
                                              showAddLocation: false })
        case LOCATION_SELECTED:
            return Object.assign(state, {}, { showLocationDetail: true,
                                              activeCoords: action.coords })

        case SEARCH_RESULT_SELECTED:
        default:
            return state
    }
}
