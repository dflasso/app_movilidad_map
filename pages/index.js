import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import EsriMap from '../middleware/arcgis'

const currentPositionInit = {
  latitude: -0.314861,
  longitude: -78.443472
}


export default function Home({ destinationLatitude = -0.31435138796969286, destinationLongitude = -78.4449847658831 }) {

  const [currentPosition, setCurrentPosition] = useState(null)

  useEffect(() => {
    const id = null
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        setCurrentPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      });
      id = setInterval(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
          setCurrentPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        });
      }, 30000)
    } else {
      alert("Not Available Geolocation");
    }
    return () => {
      clearInterval(id);
    };

  }, [])


  if (currentPosition == null) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Espe Movilidad - Mapa</title>
          <meta name="description" content="ESPE movilidad Arcgiss" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Cargando...</h1>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Espe Movilidad - Mapa</title>
        <meta name="description" content="ESPE movilidad Arcgiss" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <EsriMap id="5b94a76b52a64049934210494aa2f6bb"
        destinationLatitude={destinationLatitude}
        destinationLongitude={destinationLongitude}
        originLatitude={currentPosition.latitude}
        originLongitude={currentPosition.longitude}
      />


    </div >
  )
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