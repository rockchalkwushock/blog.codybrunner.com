import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			config: { applyBaseStyles: false },
		}),
	],
	server: {
		open: true,
		port: 4000,
	},
	site: 'https://blog.codybrunner.com',
})
