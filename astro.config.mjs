import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'

// Remark Plugins
import remarkCodeTitle from 'remark-flexible-code-titles'
import remarkExternalLinks from 'remark-external-links'
import remarkNormalizeHeadings from 'remark-normalize-headings'
import remarkSectionize from 'remark-sectionize'
import remarkToc from 'remark-toc'
import remarkValidateLinks from 'remark-validate-links'
// Rehype Plugins
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
// Custom Plugins
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs'

// https://astro.build/config
export default defineConfig({
	integrations: [
		mdx(),
		tailwind({
			config: { applyBaseStyles: false },
		}),
	],
	markdown: {
		rehypePlugins: [
			rehypeHeadingIds,
			rehypeSlug,
			[rehypeAutolinkHeadings, { behavior: 'wrap' }],
			rehypeAccessibleEmojis,
		],
		remarkPlugins: [
			[remarkToc, { maxDepth: 4, ordered: false, tight: true }],
			remarkNormalizeHeadings,
			remarkSectionize,
			remarkExternalLinks,
			remarkReadingTime,
			remarkCodeTitle,
			remarkValidateLinks,
		],
		shikiConfig: {
			theme: 'material-palenight',
			wrap: true,
		},
	},
	server: {
		open: true,
		port: 4000,
	},
	site: 'https://blog.codybrunner.com',
})
