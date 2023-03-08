import { defineCollection, z } from 'astro:content'

const postsSchema = z.object({
	archived: z.boolean().default(false),
	author: z.string().default('Cody Brunner'),
	canonicalURL: z.string().url(),
	categories: z
		.array(z.enum(['expat', 'personal', 'technology', 'travel']))
		.optional(),
	createdAt: z.string().transform(str => new Date(str)),
	description: z.string(),
	draft: z.boolean().default(true),
	featured: z.boolean().default(false),
	heroImage: z
		.object({
			alt: z.string(),
			src: z.string().url(),
		})
		.optional(),
	language: z.enum(['en', 'es']),
	publishedAt: z
		.string()
		.transform(str => new Date(str))
		.optional(),
	tags: z
		.array(
			z.enum([
				'absinthe',
				'asd',
				'ash',
				'astrojs',
				'autism',
				'aws',
				'ci-cd',
				'cli',
				'cloudflare',
				'colombia',
				'deploy',
				'django',
				'dns',
				'docker',
				'docker-compose',
				'ecto',
				'elixir',
				'erlang',
				'family',
				'fly',
				'git',
				'graphql',
				'hasura',
				'hugo',
				'immigration',
				'iterm',
				'javascript',
				'linux',
				'macos',
				'marriage',
				'mdx',
				'nextjs',
				'netlify',
				'nodejs',
				'opinion',
				'oss',
				'phoenix',
				'phoenix-liveview',
				'pnpm',
				'psql',
				'python',
				'raspberry-pi',
				'reactjs',
				'react-query',
				'rust',
				'solidjs',
				'solidstart',
				'sql',
				'ssh',
				'storybookjs',
				'svelte',
				'sveltekit',
				'tailwindcss',
				'typescript',
				'vercel',
				'vitejs',
				'vitest',
				'vscode',
				'yarn',
				'zsh',
			])
		)
		.optional(),
	title: z.string(),
	updatedAt: z
		.string()
		.transform(str => new Date(str))
		.optional(),
})

const postsCollection = defineCollection({ schema: postsSchema })

export type PostSchema = z.infer<typeof postsSchema>

export const collections = {
	posts: postsCollection,
}
