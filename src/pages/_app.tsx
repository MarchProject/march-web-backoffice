import Head from 'next/head'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Providers from '@/providers'

export default function App({ Component, pageProps }: AppProps) {
  const title = `March ${process.env.version}`
  return (
    <>
      <Head>
        <meta
          key="viewport"
          name="viewport"
          content="initial-scale=1.0, width=device-width, shrink-to-fit=no"
        />
        <title>{title}</title>
      </Head>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </>
  )
}
