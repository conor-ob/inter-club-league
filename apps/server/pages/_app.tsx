import 'raf/polyfill'
import 'setimmediate'

import { GoogleAnalytics } from '@next/third-parties/google'
import { Provider } from 'app/provider'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Layout } from '../components/web-layout'

import '../global.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ICL</title>
        <meta name='description' content='Inter Club League' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Provider>
        {/* <PWAInstallPrompt /> */}

        <Layout>
          <Component {...pageProps} />
        </Layout>

        {process.env.NODE_ENV === 'production' && (
          <GoogleAnalytics gaId='G-78W6EQTCKS' />
        )}
      </Provider>
    </>
  )
}
