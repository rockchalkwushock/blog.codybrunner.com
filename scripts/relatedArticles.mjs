import { sync } from 'glob'
import { readFileSync, writeFileSync } from 'fs'
import matter from 'gray-matter'
import chalk from 'chalk'

const { log } = console
const info = chalk.cyanBright.bold
const success = chalk.magentaBright.bold

// TODO: Update this to scan all sub-directories in the future.
const files = sync('./src/content/articles/**/**/*.mdx')
const slugRegex = /.*?(?=\d{4})/g

log(info('Running Script >>>'))
for (const file of files) {
	const relatedArticles = []
	const content = readFileSync(file, 'utf-8')
	const { data: frontmatter } = matter(content)
	const currentFileSlug = frontmatter.canonicalURL.replace(slugRegex, '')

	for (const otherFile of files) {
		const otherContent = readFileSync(otherFile, 'utf-8')
		const { data: otherFrontmatter } = matter(otherContent)
		const otherFileSlug = otherFrontmatter.canonicalURL.replace(slugRegex, '')

		if (
			currentFileSlug !== otherFileSlug &&
			otherFrontmatter.tags &&
			frontmatter.tags &&
			otherFrontmatter.tags.some(tag => frontmatter.tags.includes(tag))
		) {
			relatedArticles.push(otherFileSlug)
		}
	}

	frontmatter.relatedArticles =
		relatedArticles.length > 1 ? relatedArticles : []

	const updatedFileContents = matter.stringify(content).trim()

	const yamlString = `${updatedFileContents}\n---\n`

	log(info(`${frontmatter.title}:`))
	log(success(`>>> ${relatedArticles.length} related articles found.`))
	log(success(`>>> Updating Article Contents`))

	writeFileSync(file, yamlString)
}
