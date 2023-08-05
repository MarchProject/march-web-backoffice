import Head from 'next/head'
import '../styles/globals.css'
import '../styles/theme.css'
import type { AppProps } from 'next/app'
import Providers from '@/providers'
import 'react-block-ui/style.css'
import { ThemeProvider } from '@mui/material'
import { theme } from '@/theme/theme'
import '../translations/i18n'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { getLanguage, setLanguage } from '@/config/client'

export default function App({ Component, pageProps }: AppProps) {
  const title = `March ${process.env.version}`
  const { i18n } = useTranslation()
  const [lg, setLg] = useState(null)
  useEffect(() => {
    setLg(getLanguage())
  }, [])

  useEffect(() => {
    if (lg) {
      i18n.changeLanguage(lg)
    }
    // else {
    //   i18n.changeLanguage('en')
    //   setLanguage('en')
    // }
  }, [i18n, lg])

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
          <Component className="font-IBMPlexSansThai" {...pageProps} />
        </Providers>
      </ThemeProvider>
    </>
  )
}
