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
        <title>ICL</title>
        <meta name='description' content='Inter Club League' />
        <link rel='icon' href={`/favicon.ico`} />
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
