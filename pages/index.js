import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import EsriMap from '../middleware/arcgis'


export default function Home({ destinationLatitude = -0.31435138796969286, destinationLongitude = -78.4449847658831 }) {

  const [geolocationAvailable, setGeolocationAvailable] = useState(false)


  useEffect(() => {
    const id = null
    responsiveVoice.speak("Viaje iniciado", 'Spanish Female');
    if ("geolocation" in navigator) {
      console.log("Available");
      setGeolocationAvailable(true)

    } else {
      alert("Not Available Geolocation");
    }
    return () => {
      clearInterval(id);
    };

  }, [])


  if (!geolocationAvailable) {
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