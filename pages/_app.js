import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://js.arcgis.com/4.22/esri/themes/light/main.css" />
        <script src="https://js.arcgis.com/4.22/"></script>
      </Head>
      <Component {...pageProps} />
    </>)
}

export default MyApp
