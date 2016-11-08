setLocationInformation(locationData) {
    return {
        type: 'SET_LOCATION_INFORMATION',
        data: locationData
    };
}

removeLocationInformation: function() {
    return {
        type: 'REMOVE_LOCATION_INFORMATION'
        };
    }
