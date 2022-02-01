import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="https://code.responsivevoice.org/responsivevoice.js?key=gQWwqEL8"></script>
      </Head>
      <Component {...pageProps} />
    </>)
}

export default MyApp
