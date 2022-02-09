import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import EsriMapOnlyView from '../middleware/arcgisOnlyMap'

import Script from 'next/script'

const currentLocationInit = {
  latitude: -0.31435138796969286,
  longitude: -78.4449847658831
}

export default function ArcgisCurrentLocation() {

  const [geolocationAvailable, setGeolocationAvailable] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(currentLocationInit);

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {

        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })

        setGeolocationAvailable(true)
      })
    } else {
      alert("Not Available Geolocation");
    }
    return () => { };

  }, [])


  if (!geolocationAvailable) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Espe Movilidad - Ubicación Actual</title>
          <meta name="description" content="ESPE movilidad Arcgiss" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Cargando...</h1>
      </div>
    )
  }


  return (
    <div className={styles.container}>
      {/* <Script src="https://code.responsivevoice.org/responsivevoice.js?key=gQWwqEL8"></Script> */}
      <Head>
        <title>Espe Movilidad - Ubicación Actual</title>
        <meta name="description" content="ESPE movilidad Arcgiss" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <EsriMapOnlyView id="5b94a76b52a64049934210494aa2f6bb"
        originLatitude={currentLocation.latitude}
        originLongitude={currentLocation.longitude}
      />


    </div >
  )
}
