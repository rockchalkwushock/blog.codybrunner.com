import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'

export function remarkReadingTime(params) {
	return function (tree, { data }) {
		const rawText = toString(tree)
		const { text, words } = getReadingTime(rawText)

		data.astro.frontmatter.readingTime = text
		data.astro.frontmatter.wordCount = words
	}
}
