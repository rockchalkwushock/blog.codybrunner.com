import { z } from 'astro:content'

const CATEGORIES = ['expat', 'personal', 'technology', 'travel'] as const
const CategoriesEnum = z.enum(CATEGORIES)
export type CategoryEnum = z.infer<typeof CategoriesEnum>

export const categoriesSchema = z.array(CategoriesEnum).optional()

const EXPAT_TAGS = [''] as const
const PERSONAL_TAGS = [''] as const
const TECH_TAGS = [
	'astro',
	'ci-cd',
	'cli',
	'cloudflare',
	'deploy',
	'ecto',
	'elixir',
	'github-actions',
	'graphql',
	'hugo',
	'iterm',
	'javascript',
	'macos',
	'nodejs',
	'pnpm',
	'psql',
	'python',
	'qwik',
	'qwik-city',
	'reactjs',
	'ssh',
	'tailwindcss',
	'typescript',
	'vscode',
	'yarn',
	'zsh',
] as const
const TRAVEL_TAGS = ['colombia'] as const

const TAGS = [
	...EXPAT_TAGS,
	...PERSONAL_TAGS,
	...TECH_TAGS,
	...TRAVEL_TAGS,
] as const
const TagsEnum = z.enum(TAGS)
export type TagsEnum = z.infer<typeof TagsEnum>

export const tagsSchema = z.array(TagsEnum).optional()

// const TAGS = [
// 	'astro',
// 	'cli',
// 	'cloudflare',
// 	'colombia',
// 	'github-actions',
// 	'iterm',
// 	'javascript',
// 	'macos',
// 	'pnpm',
// 	'python',
// 	'qwik',
// 	'qwik-city',
// 	'ssh',
// 	'tailwindcss',
// 	'yarn',
// ] as const
