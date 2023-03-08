const { fontFamily } = require('tailwindcss/defaultTheme')

const aura = {
	black: '#15141b',
	blue: '#82e2ff',
	gray: '#6d6d6d',
	green: '#61ffca',
	orange: '#ffca85',
	pink: '#f694ff',
	purple: '#a277ff',
	'purple-fading': '#3d375e7f',
	red: '#ff6767',
	white: '#edecee',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.astro'],
	theme: {
		extend: {
			colors: {
				aura: { ...aura },
				black: '#000000',
				current: 'currentColor',
				transparent: 'transparent',
				white: '#ffffff',
			},
			fontFamily: {
				...fontFamily,
				mono: ['Fira Code', ...fontFamily.mono],
				sans: ['Inter', ...fontFamily.sans],
			},
			typography: ({ theme }) => ({
				invert: {
					css: {
						color: theme('colors.aura.white'),
						a: {
							color: theme('colors.aura.green'),
							fontWeight: theme('fontWeight.semibold'),
						},
						'a code': {
							color: theme('colors.aura.orange'),
						},
						blockquote: {
							backgroundColor: theme('colors.aura.purple-fading'),
							borderLeftColor: theme('colors.aura.purple'),
							borderRadius: theme('borderRadius.lg'),
							boxShadow: theme('boxShadow.md'),
							fontWeight: theme('fontWeight.normal'),
							quotes: 'unset',
							textAlign: 'left',
						},
						'blockquote p:first-of-type::before': {
							content: 'unset',
						},
						'blockquote p:last-of-type::after': {
							content: 'unset',
						},
						'blockquote p': {
							marginBottom: 'unset !important',
							marginTop: 'unset !important',
							padding: theme('spacing.3'),
						},
						code: {
							color: theme('colors.aura.orange'),
							fontWeight: theme('fontWeight.normal'),
						},
						del: {
							color: theme('colors.aura.red'),
						},
						em: {
							color: theme('colors.aura.blue'),
							fontWeight: theme('fontWeight.medium'),
						},
						'h1 a': {
							color: theme('colors.aura.orange'),
						},
						'h2 a': {
							color: theme('colors.aura.purple'),
						},
						'h3 a': {
							color: theme('colors.aura.purple'),
						},
						'h4 a': {
							color: theme('colors.aura.pink'),
						},
						'h5 a': {
							color: theme('colors.aura.pink'),
						},
						'h6 a': {
							color: theme('colors.aura.blue'),
							textTransform: 'uppercase',
						},
						img: {
							borderRadius: theme('borderRadius.lg'),
							marginLeft: 'auto',
							marginRight: 'auto',
						},
						p: {
							letterSpacing: theme('letterSpacing.wide'),
						},
						strong: {
							color: theme('colors.aura.red'),
							fontWeight: theme('fontWeight.bold'),
						},
					},
				},
			}),
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
