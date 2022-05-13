/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const codesandbox = require('remark-codesandbox')
const mermaid = require('remark-mermaidjs')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require('@next/mdx')({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [[codesandbox, { mode: 'button' }], [mermaid]],
		rehypePlugins: [],
		providerImportSource: '@mdx-js/react'
	}
})

module.exports = withMDX({
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	reactStrictMode: true,
	outputFileTracing: false,
	swcMinify: true,
	react: {
		useSuspense: true
	},
	compiler: {
		styledComponents: true
	},
	// experimental: {
	// 	runtime: 'edge'
	// },
	amp: true,
	poweredByHeader: false
})
