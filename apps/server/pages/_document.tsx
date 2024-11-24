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

  // TODO bg-background color
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='UTF-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <link rel='preconnect' href='https://www.googletagmanager.com' />
        </Head>
        <body className='bg-[#f6f6f6] dark:bg-[#010101]'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
