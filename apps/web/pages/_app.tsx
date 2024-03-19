import 'raf/polyfill'
import 'setimmediate'

import { Provider } from '@inter-club-league/app/provider'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Layout } from '../navigation/layout'

import '../global.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ICL</title>
        <meta name='description' content='Inter Club League' />
        <link rel='icon' href={`/favicon.ico`} />
      </Head>
      <Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  )
}

export default App
