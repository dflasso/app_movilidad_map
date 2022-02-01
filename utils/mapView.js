import { playVoiceAssintant } from "./voiceAssistant";

const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";


export default function printMapVire(
    destinationLatitude = -0.31435138796969286,
    destinationLongitude = -78.4449847658831,
    view = {},
    Point, Graphic, route, RouteParameters, FeatureSet
) {

    navigator.geolocation.getCurrentPosition(function (position) {
        const currentPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }

        view.graphics.removeAll();

        const origin = new Point({ latitude: currentPosition.latitude, longitude: currentPosition.longitude })

        const graphicOrigin = new Graphic({
            symbol: {
                type: "simple-marker",
                color: "white",
                size: "8px"
            },
            geometry: origin
        });

        const destination = new Point({ latitude: destinationLatitude, longitude: destinationLongitude })
        const graphicDestination = new Graphic({
            symbol: {
                type: "simple-marker",
                color: "black",
                size: "8px"
            },
            geometry: destination
        });

        view.graphics.add(graphicOrigin);

        view.graphics.add(graphicDestination);

        const routeParams = new RouteParameters({
            stops: new FeatureSet({
                features: view.graphics.toArray()
            }),

            returnDirections: true

        });

        route.solve(routeUrl, routeParams).then((data) => {
            data.routeResults.forEach(function (result) {
                result.route.symbol = {
                    type: "simple-line",
                    color: [5, 150, 255],
                    width: 3
                };
                view.graphics.add(result.route);
                playVoiceAssintant({
                    originLongitude: currentPosition.longitude,
                    originLatitude: currentPosition.latitude,
                    destinyLongitude: destinationLongitude,
                    destinyLatitude: destinationLatitude
                })
            });

        }).catch(function (error) {
            console.log(error);
        })


    })




}