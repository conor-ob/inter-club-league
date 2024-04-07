import 'raf/polyfill'
import 'setimmediate'

import { GoogleAnalytics } from '@next/third-parties/google'
import { colors } from 'app/design/colors'
import { Provider } from 'app/provider'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useColorScheme } from 'react-native'
import { Layout } from '../components/web-layout'

import '../global.css'

export default function App({ Component, pageProps }: AppProps) {
  const colorScheme = useColorScheme()

  return (
    <>
      <Head>
        <title>ICL</title>
        <meta name='description' content='Inter Club League' />
        <link rel='icon' href='/favicon.ico' />

        <meta name='application-name' content='ICL' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='ICL' />
        <meta name='description' content='Inter Club League' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta
          name='theme-color'
          content={colors[colorScheme ?? 'light'].background}
        />
        <meta
          name='background-color'
          content={colors[colorScheme ?? 'light'].background}
        />

        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/assets/icon/apple-touch-icon.png' />
        <link rel='shortcut icon' href='/favicon.ico' />

        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
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
