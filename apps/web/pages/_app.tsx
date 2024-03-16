import 'raf/polyfill'
import 'setimmediate'

import { Provider } from '@inter-club-league/app/provider'
import { AppProps } from 'next/app'
import Head from 'next/head'

import '../global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Putting Pals</title>
        <meta name='description' content='Putting Pals Major Sweepstakes' />
        <link rel='icon' href={`/favicon.ico`} />
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
