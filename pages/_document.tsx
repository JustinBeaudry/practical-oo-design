// noinspection JSUnusedGlobalSymbols

import { NextPage } from 'next'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { lightTheme as theme } from '../src/theme'
import createEmotionCache from '../src/createEmotionCache'
import createEmotionServer from '@emotion/server/create-instance'
import { Component, ComponentPropsWithoutRef, ElementType, JSXElementConstructor, ReactElement } from 'react'
import App, { AppProps } from './_app'

export default class Document extends NextDocument<AppProps> {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<meta name='theme-color' content={theme.palette.primary.main} />
					<link rel='shortcut icon' href='/static/favicon.ico' />
					<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
					{(this.props as ComponentPropsWithoutRef<ElementType>).emotionStyleTags}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

Document.getInitialProps = async ctx => {
	const ogRenderPage = ctx.renderPage
	const cache = createEmotionCache()
	const { extractCriticalToChunks } = createEmotionServer(cache)

	ctx.renderPage = () =>
		ogRenderPage({
			enhanceApp: (App: JSXElementConstructor<any>) =>
				function EnhanceApp(props) {
					return <App emotionCache={cache} {...props} />
				}
		})

	const initialProps = await NextDocument.getInitialProps(ctx)
	const emotionStyles = extractCriticalToChunks(initialProps.html)
	const emotionStyleTags = emotionStyles.styles.map(style => (
		<style
			data-emotion={`${style.key} ${style.ids.join(' ')}`}
			key={style.key}
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	))

	return {
		...initialProps,
		emotionStyleTags
	}
}
