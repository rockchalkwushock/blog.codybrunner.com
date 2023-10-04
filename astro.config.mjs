import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
	integrations: [react(), tailwind(), mdx()],
	markdown: {
		rehypePlugins: [],
		remarkPlugins: [],
		// Necessary to allow for `rehype-pretty-code` to work.
		syntaxHighlight: false,
	},
	server: {
		open: true,
		port: 3001,
	},
	site: 'https://blog.codybrunner.com',
})
