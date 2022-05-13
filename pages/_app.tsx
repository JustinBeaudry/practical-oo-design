import Head from 'next/head'
import { FC } from 'react'
import type { AppProps as NextAppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '../src/createEmotionCache'
import { lightTheme as theme } from '../src/theme'
import { MDXProvider } from '@mdx-js/react'
import { unstable_useWebVitalsReport } from 'next/streaming'

import '@fontsource/anonymous-pro'

const components = {}

const clientSideEmotionCache = createEmotionCache()

export interface AppProps extends NextAppProps {
	emotionCache?: EmotionCache
}

const App: FC<AppProps> = props => {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
	unstable_useWebVitalsReport(data => console.log(data))
	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name='viewport' content='initial-scale=1, width=device-width' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
			</Head>
			<MDXProvider components={components}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Component {...pageProps} />
				</ThemeProvider>
			</MDXProvider>
		</CacheProvider>
	)
}
export default App
