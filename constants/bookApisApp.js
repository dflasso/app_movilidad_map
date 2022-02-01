export default {
    directions: {
        get_one: ({ originLatitude = 0.0, originLongitude = 0.0,
            destinyLatitude = 0.0, destinyLongitude = 0.0 }) => `/api/get_directions?origin=${originLatitude},${originLongitude}&destiny=${destinyLatitude},${destinyLongitude}`
    }
}