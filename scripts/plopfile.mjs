import { sync } from 'glob'
import { readFileSync } from 'fs'
import matter from 'gray-matter'

const expatTags = []
const personalTags = []
const technologyTags = [
	{ name: 'Astro', value: 'astro' },
	{ name: 'CI/CD', value: 'ci-cd' },
	{ name: 'CLI', value: 'cli' },
	{ name: 'Cloudflare', value: 'cloudflare' },
	{ name: 'Deploy', value: 'deploy' },
	{ name: 'Docker', value: 'docker' },
	{ name: 'Ecto', value: 'ecto' },
	{ name: 'Elixir', value: 'elixir' },
	{ name: 'Fly', value: 'fly' },
	{ name: 'GitHub Actions', value: 'github-actions' },
	{ name: 'Go', value: 'go' },
	{ name: 'GraphQL', value: 'graphql' },
	{ name: 'Hugo', value: 'hugo' },
	{ name: 'Iterm', value: 'iterm' },
	{ name: 'JS', value: 'javascript' },
	{ name: 'macOS', value: 'macos' },
	{ name: 'Make', value: 'make' },
	{ name: 'NextJS', value: 'nextjs' },
	{ name: 'NodeJS', value: 'nodejs' },
	{ name: 'PNPM', value: 'pnpm' },
	{ name: 'PostgreSQL', value: 'psql' },
	{ name: 'Python', value: 'python' },
	{ name: 'Qwik', value: 'qwik' },
	{ name: 'Qwik-City', value: 'qwik-city' },
	{ name: 'ReactJS', value: 'reactjs' },
	{ name: 'Scripting', value: 'scripting' },
	{ name: 'SSH', value: 'ssh' },
	{ name: 'Tailwind', value: 'tailwindcss' },
	{ name: 'Turso', value: 'turso' },
	{ name: 'TS', value: 'typescript' },
	{ name: 'VSCode', value: 'vscode' },
	{ name: 'Yarn', value: 'yarn' },
	{ name: 'ZSH', value: 'zsh' },
]
const travelTags = [{ name: 'Colombia', value: 'colombia' }]

export default function (
	/** @type {import('plop').NodePlopAPI} */
	plop
) {
	plop.setHelper('arrayToYAML', function (array) {
		return array
			.reduce((acc, str, idx) => {
				if (idx === 0) {
					acc.push(`\n- ${str}`)
					return acc
				}
				acc.push(`- ${str}`)
				return acc
			}, [])
			.join('\n')
	})
	plop.setHelper('findRelatedArticles', params => {
		const selectedTags = params.data.root.tags
		const newArticleSlug = params.data.root.path
		// TODO: Update this to include all sub-directories in future.
		const files = sync('./src/content/articles/2024/**/*.mdx')
		const relatedArticles = []

		files.forEach(file => {
			const content = readFileSync(file, 'utf-8')
			const { data } = matter(content)
			const slug = data.canonicalURL.replace(/.*?(?=\d{4})/g, '')
			if (
				slug !== newArticleSlug &&
				data.tags.some(tag => selectedTags.includes(tag))
			) {
				relatedArticles.push(slug)
			}
		})

		return relatedArticles.length > 1
			? relatedArticles
					.map((str, idx) => {
						if (idx === 0) return `\n- ${str}`
						return `- ${str}`
					})
					.join('\n')
			: []
	})
	plop.setGenerator('article', {
		actions: data => {
			const year = new Date().getFullYear()
			const [date] = new Date().toLocaleString().split(',')
			data.createdAt = date
			data.path = `${year}/${data.title
				.replace(/[^a-zA-Z0-9]+/g, '-')
				.toLowerCase()}`
			data.year = year
			return [
				{
					path: '../src/content/articles/{{year}}/{{ dashCase title }}/index.mdx',
					templateFile: '../templates/article.mdx.hbs',
					type: 'add',
				},
			]
		},
		description: 'Generates bootstrapped article.',
		prompts: [
			{
				message: 'Article Title',
				name: 'title',
				type: 'input',
			},
			{
				message: 'Article Description',
				name: 'description',
				type: 'input',
			},
			{
				choices: [
					{ name: 'Expat', value: 'expat' },
					{ name: 'Personal', value: 'personal' },
					{ name: 'Technology', value: 'technology' },
					{ name: 'Travel', value: 'travel' },
				],
				message: 'Article Categories',
				name: 'categories',
				type: 'checkbox',
			},
			{
				choices: (a, b) => {
					let tagList = []
					if (a.categories.some(value => value === 'expat')) {
						tagList = [
							{ disabled: true, name: 'Expat Tags', value: undefined },
							...expatTags,
						]
					}
					if (a.categories.some(value => value === 'personal')) {
						tagList = [
							...tagList,
							{ disabled: true, name: 'Personal Tags', value: undefined },
							...personalTags,
						]
					}
					if (a.categories.some(value => value === 'technology')) {
						tagList = [
							...tagList,
							{ disabled: true, name: 'Technology Tags', value: undefined },
							...technologyTags,
						]
					}
					if (a.categories.some(value => value === 'travel')) {
						tagList = [
							...tagList,
							{ disabled: true, name: 'Travel Tags', value: undefined },
							...travelTags,
						]
					}
					return tagList
				},
				message: 'Article Tags',
				name: 'tags',
				type: 'checkbox',
			},
		],
	})
}
