import React, { useRef, useEffect } from "react";
import { loadModules } from "esri-loader";

import { playVoiceCurrentLocation } from "../utils/voiceAssistant";

// hooks allow us to create a map component as a function
export default function EsriMapOnlyView({ id,
    originLatitude = -0.3149629224030782,
    originLongitude = -78.44217381083543
}) {
    // create a ref to element to be used as the map's container
    const mapEl = useRef(null);

    // use a side effect to create the map after react has rendered the DOM
    useEffect(
        () => {
            // define the view here so it can be referenced in the clean up function
            let view;
            // the following code is based on this sample:
            // https://developers.arcgis.com/javascript/latest/sample-code/webmap-basic/index.html
            // first lazy-load the esri classes
            loadModules(["esri/views/MapView", "esri/WebMap", "esri/config",
                "esri/geometry/Point",
                "esri/Graphic",
                "esri/rest/route",
                "esri/rest/support/RouteParameters",
                "esri/rest/support/FeatureSet"], {
                css: true
            }).then(([MapView, WebMap, esriConfig, Point, Graphic]) => {

                esriConfig.apiKey = "AAPKbcd2e1a9749c4d5fa9d7d6dc214a2fafxvzExwTM46dFIafU0tei1SvBl6JBm_yd-qmm2RKQU3ng66pedho77f8bbM0T7nVD";
                // then we load a web map from an id
                const webmap = new WebMap({
                    // autocasts as new PortalItem()
                    portalItem: {
                        // get item id from the props
                        id
                    }
                });

                // and we show that map in a container
                view = new MapView({
                    map: webmap,
                    // use the ref as a container
                    container: mapEl.current,
                    center: [originLongitude, originLatitude], //Longitude, latitude
                    zoom: 16
                });

                const origin = new Point({ latitude: originLatitude, longitude: originLongitude })
                const graphicOrigin = new Graphic({
                    symbol: {
                        type: "simple-marker",
                        color: "white",
                        size: "20px"
                    },
                    geometry: origin
                });

                view.graphics.add(graphicOrigin);

                playVoiceCurrentLocation({
                    destinyLatitude: originLatitude,
                    destinyLongitude: originLongitude,
                    originLatitude: originLatitude,
                    originLongitude: originLongitude
                })
            });


            return () => {
                // clean up the map view
                if (!!view) {
                    view.destroy();
                    view = null;
                }
            };
        },
        // only re-load the map if the id has changed
        [id]
    );
    return <div style={{ height: '98vh', width: '100vw' }} ref={mapEl} />;
}