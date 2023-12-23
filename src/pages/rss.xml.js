import rss from '@astrojs/rss'
import { getCollection, getEntry } from 'astro:content'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
const parser = new MarkdownIt()

import { isPublished } from '~/utils/helpers'

// https://docs.astro.build/en/guides/rss/#setting-up-astrojsrss
export async function GET(context) {
	const articles = await getCollection('articles', article => {
		return isPublished(article)
	})
	const author = await getEntry('authors', 'cody-brunner')
	return rss({
		// (optional) inject custom xml
		customData: `<language>en-us</language>`,
		// `<description>` field in output xml
		description: 'My musings about the everyday challenges of life and things I have learned in software development.',
		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		items: articles.map(article => ({
			author: author.data.name,
			categories: [...article.data.categories, ...(article.data.tags ?? [])],
			content: sanitizeHtml(parser.render(article.body)),
			description: article.data.description,
			link: article.slug,
			pubDate: article.data.publishedAt,
			source: {
				title: 'RSS Feed | blog.codybrunner.com',
				url: 'https://blog.codybrunner.com',
			},
			title: article.data.title,
		})),
		// Pull in your project "site" from the endpoint context
		// https://docs.astro.build/en/reference/api-reference/#contextsite
		site: context.site,
		stylesheet: '/rss/styles.xsl',
		// `<title>` field in output xml
		title: 'RSS Feed | blog.codybrunner.com',
	})
}
