import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { playVoiceAssintant } from "../utils/voiceAssistant";

import { checkObstacles, playAlarmObstacle } from "../utils/AlarmObstacle";
import { Fab } from '@mui/material';
import { Navigation } from '@mui/icons-material';

const urlBase = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyD08wAcsWg_pXQ04M2i-l9XpqX3gopb6U8"

export default function GoogleMapsPage({ destinationLatitude = -0.31435138796969286, destinationLongitude = -78.4449847658831 }) {
    const [aviableGeolocation, setaviableGeolocation] = useState(false);
    const [urlMap, setUrlMap] = useState(urlBase);

    useEffect(() => {
        let idIntervalVoiceAssistance = null
        let idIntervalGoogleMaps = null
        let idIntervalObstacle = null
        let existObstacle = false
        if ("geolocation" in navigator) {


            navigator.geolocation.getCurrentPosition(function (position) {
                console.log("Available");
                setaviableGeolocation(true)
                let api = urlBase
                api = api + `&origin=${position.coords.latitude},${position.coords.longitude}`
                api = api + `&destination=${destinationLatitude},${destinationLongitude}`
                api = api + `&mode=walking`
                api = api + `&language=es-419`
                api = api + `&zoom=18`
                api = api + `&center=${position.coords.latitude},${position.coords.longitude}`
                setUrlMap(api)
            })

            idIntervalObstacle = setInterval(() => {
                navigator.geolocation.getCurrentPosition(function (position) {
                    existObstacle = checkObstacles({
                        originLatitude: position.coords.latitude,
                        originLongitude: position.coords.longitude
                    })

                    // console.log(`${position.coords.latitude}     ${position.coords.longitude}`)

                    if (existObstacle) {
                        playAlarmObstacle()
                    }
                })
            }, 1000)


            idIntervalVoiceAssistance = setInterval(
                () => {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        playVoiceAssintant({
                            originLongitude: position.coords.longitude,
                            originLatitude: position.coords.latitude,
                            destinyLongitude: destinationLongitude,
                            destinyLatitude: destinationLatitude
                        })

                        let api = urlBase
                        api = api + `&origin=${position.coords.latitude},${position.coords.longitude}`
                        api = api + `&destination=${destinationLatitude},${destinationLongitude}`
                        api = api + `&mode=walking`
                        api = api + `&language=es-419`
                        api = api + `&zoom=18`
                        api = api + `&center=${position.coords.latitude},${position.coords.longitude}`
                        setUrlMap(api)


                    })
                }, 15000
            )

        } else {
            alert("Not Available Geolocation");
        }

        return () => {
            clearInterval(idIntervalGoogleMaps)
            clearInterval(idIntervalObstacle)
        };
    }, []);

    const handleClickNavigation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            let api = urlBase
            api = api + `&origin=${position.coords.latitude},${position.coords.longitude}`
            api = api + `&destination=${destinationLatitude},${destinationLongitude}`
            api = api + `&mode=walking`
            api = api + `&language=es-419`
            api = api + `&zoom=18`
            api = api + `&center=${position.coords.latitude},${position.coords.longitude}`
            window.open(api)
        })
    }

    if (!aviableGeolocation) {
        return <h1>Solicitando acceso a la ubicaci??n actual...</h1>
    }


    return (
        <div >
            <Head>
                <title>Espe Movilidad - Mapa</title>
                <meta name="description" content="ESPE movilidad Arcgiss" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.container}>
                {/* <CurrentLocationCard /> */}
                <iframe
                    className={styles.mapViewGoogleMaps}
                    loading="lazy"
                    src={urlMap}>
                </iframe>
                <Fab sx={{ position: 'fixed', bottom: 130, right: 16 }} aria-label="navigate" color="primary" onClick={handleClickNavigation} >
                    <Navigation />
                </Fab>
            </main>
        </div>);
}


//?destinationLatitude=-0.31435138796969286&destinationLongitude=-78.4449847658831
export async function getServerSideProps(context) {

    const { destinationLatitude, destinationLongitude } = context.query

    return {
        props: {
            destinationLatitude: Number(destinationLatitude),
            destinationLongitude: Number(destinationLongitude),
        }, // will be passed to the page component as props
    }
}