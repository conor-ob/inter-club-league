import type { DocumentContext } from 'next/document'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { AppRegistry } from 'react-native'

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    AppRegistry.registerComponent('Main', () => Main)
    // @ts-ignore
    const { getStyleElement } = AppRegistry.getApplication('Main')
    const styles = [getStyleElement()]

    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps, styles: React.Children.toArray(styles) }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='UTF-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <link rel='preconnect' href='https://cdn.jsdelivr.net' />
          <link rel='preconnect' href='https://www.googletagmanager.com' />
          <link
            rel='preload'
            href='https://cdn.jsdelivr.net/gh/conor-ob/cdn@latest/font/inter-regular.otf'
            as='font'
            type='font/otf'
            crossOrigin='anonymous'
          />
          <link
            rel='preload'
            href='https://cdn.jsdelivr.net/gh/conor-ob/cdn@latest/font/inter-medium.otf'
            as='font'
            type='font/otf'
            crossOrigin='anonymous'
          />
          <link
            rel='preload'
            href='https://cdn.jsdelivr.net/gh/conor-ob/cdn@latest/font/inter-semibold.otf'
            as='font'
            type='font/otf'
            crossOrigin='anonymous'
          />
          <link
            rel='preload'
            href='https://cdn.jsdelivr.net/gh/conor-ob/cdn@latest/font/inter-bold.otf'
            as='font'
            type='font/otf'
            crossOrigin='anonymous'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
