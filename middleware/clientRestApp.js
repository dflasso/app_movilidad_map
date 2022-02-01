import APIsApp from "../constants/bookApisApp";

export function getDirections({ originLatitude = 0.0, originLongitude = 0.0,
    destinyLatitude = 0.0, destinyLongitude = 0.0, }) {
    return new Promise((resolve, reject) => {
        fetch(APIsApp.directions.get_one({ originLatitude, originLongitude, destinyLatitude, destinyLongitude }))
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject({ error }))
    })
}