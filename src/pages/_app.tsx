import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import theme from '@/utils/theme'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Component {...pageProps}/>
    </ThemeProvider>
  )
}
