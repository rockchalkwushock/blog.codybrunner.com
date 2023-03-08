module.exports = {
	env: {
		'astro/astro': true,
		browser: true,
		es2021: true,
	},
	extends: [
		'standard-with-typescript',
		'plugin:astro/recommended',
		'plugin:astro/jsx-a11y-strict',
		'plugin:mdx/recommended',
		'plugin:tailwindcss/recommended',
		'plugin:prettier/recommended',
	],
	ignorePatterns: [
		'node_modules/',
		'dist/',
		'public/',
		'package.json',
		'tsconfig.json',
	],
	overrides: [
		{
			files: ['*.astro'],
			parser: 'astro-eslint-parser',
			parserOptions: {
				extraFileExtensions: ['.astro'],
				parser: '@typescript-eslint/parser',
				project: ['./tsconfig.json'],
				sourceType: 'module',
			},
			rules: {
				'prettier/prettier': 'off',
			},
		},
		{
			files: ['*.mdx'],
			rules: {
				'no-undef': 'off',
				'no-unused-expressions': 'off',
				'no-unused-vars': 'off',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		extraFileExtensions: ['.astro'],
		project: true,
		sourceType: 'module',
	},
	root: true,
	rules: {
		'@typescript-eslint/triple-slash-reference': 'off',
	},
	settings: {
		packageManager: 'pnpm',
		tailwindcss: {
			callees: ['classnames', 'clsx', 'ctl'],
			classRegex: '^class(Name)?$',
			config: './tailwind.config.cjs',
			cssFiles: [
				'**/*.css',
				'!**/node_modules',
				'!**/.*',
				'!**/dist',
				'!**/build',
			],
			cssFilesRefreshRate: 5_000,
			removeDuplicates: true,
			skipClassAttribute: false,
			tags: [],
			whitelist: [],
		},
	},
}
