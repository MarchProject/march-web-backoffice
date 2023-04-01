import Head from 'next/head'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Providers from '@/providers'
import 'react-block-ui/style.css'
import { ThemeProvider } from '@mui/material'
import { theme } from '@/theme/theme'

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
      <ThemeProvider theme={theme}>
        <Providers>
          <Component {...pageProps} />
        </Providers>
      </ThemeProvider>
    </>
  )
}
