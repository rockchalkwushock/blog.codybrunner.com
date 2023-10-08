import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
// Rehype/Remark Plugins
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'

const currentYear = new Date().getFullYear()

// https://astro.build/config
export default defineConfig({
	image: {
		service: {
			entrypoint: 'astro/assets/services/noop',
		},
	},
	integrations: [
		react(),
		tailwind(),
		mdx(),
		sitemap({
			serialize(item) {
				if (item.url === 'https://blog.codybrunner.com/') {
					item.changefreq = 'weekly'
					item.lastmod = new Date().toISOString()
					item.priority = 1.0
					return item
				}
				if (item.url.includes('archive')) {
					item.changefreq = 'yearly'
					item.lastmod = new Date().toISOString()
					item.priority = 0.5
					return item
				}
				if (item.url.includes('categories') || item.url.includes('tags')) {
					item.changefreq = 'monthly'
					item.lastmod = new Date().toISOString()
					item.priority = 0.7
					return item
				}
				if (!item.url.includes(currentYear)) {
					item.changefreq = 'never'
					item.priority = 0.1
					return item
				}
				item.changefreq = 'monthly'
				item.priority = 0.7
				return item
			},
		}),
	],
	markdown: {
		rehypePlugins: [
			rehypeSlug,
			[
				rehypePrettyCode,
				{
					onVisitLine(line) {
						// Prevent lines from collapsing in `display: grid` mode, and allow empty
						// lines to be copy/pasted
						if (line.children.length === 0) {
							line.children = [{ type: 'text', value: ' ' }]
						}
					},
					theme: 'material-theme-palenight',
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					behavior: 'prepend',
					content: {
						properties: {
							className: ['icon', 'icon-link'],
						},
						tagName: 'span',
						type: 'element',
					},
				},
			],
			[
				rehypeExternalLinks,
				{
					rel: ['noopener', 'noreferrer'],
					target: '_blank',
				},
			],
			rehypeAccessibleEmojis,
		],
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
