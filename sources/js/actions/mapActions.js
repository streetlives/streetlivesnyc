export const MAP_CLICKED = 'MAP_CLICKED'
export const ADD_LOCATION_CLICKED = 'ADD_LOCATION_CLICKED'
export const ADD_LOCATION_CANCELLED = 'ADD_LOCATION_CANCELLED'
export const LOCATION_SELECTED = 'LOCATION_SELECTED'
export const LOCATION_DISMISSED = 'LOCATION_DISMISSED'
export const SEARCH_RESULT_SELECTED = 'SEARCH_RESULT_SELECTED'
export const WELCOME_CLICKED = 'WELCOME_CLICKED'

export function welcomeClicked() {
    return { type: WELCOME_CLICKED }
}

export function mapClicked(coords) {
    return { type: MAP_CLICKED, coords }
}

export function locationSelected(locationData) {
    return { type: LOCATION_SELECTED, locationData }
}

export function locationDismissed() {
    return { type: LOCATION_DISMISSED }
}

export function addLocationClicked() {
    return { type: ADD_LOCATION_CLICKED }
}

export function addLocationCancelled() {
    return { type: ADD_LOCATION_CANCELLED }
}



