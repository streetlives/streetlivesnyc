export const MAP_CLICKED = 'MAP_CLICKED'
export const ADD_LOCATION_CLICKED = 'ADD_LOCATION_CLICKED'
export const ADD_LOCATION_CANCELLED = 'ADD_LOCATION_CANCELLED'
export const LOCATION_SELECTED = 'LOCATION_SELECTED'
export const SEARCH_RESULT_SELECTED = 'SEARCH_RESULT_SELECTED'

export function mapClicked(coords) {
    return { type: MAP_CLICKED, coords }
}

export function locationSelected(coords) {
    return { type: LOCATION_SELECTED, coords }
}

export function addLocationClicked() {
    return { type: ADD_LOCATION_CLICKED }
}

export function addLocationCancelled() {
    return { type: ADD_LOCATION_CANCELLED }
}



