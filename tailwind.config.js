/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				accent: 'hsl(var(--accent) / 1)',
				accent_darker: 'hsl(var(--accent-darker) / 1)',
				// Background Colors
				'color-primary-dark': 'hsl(215, 32%, 10%)',
				'color-primary-lighter': 'hsl(213, 32%, 12%)',
				'color-primary-badge': 'hsl(213, 30%, 15%)',
				'color-primary-badge-opacity': 'hsla(213, 30%, 15%, 0.87)',
				'color-primary-lighter-hover': 'hsl(213, 30%, 15%)',
				// Text Colors
				'color-text': 'hsl(0, 0%, 100%)',
				'color-text-secondary': 'hsla(0, 0%, 100%. 0.87)',
				'color-text-dimmed': 'hsla(0, 0%, 100%, 0.68)',
				'color-text-disabled': 'hsla(0, 0%, 100%, 0.48)',
				'color-text-subtle': 'hsla(0, 0%, 100%, 0.06)',
				'color-text-dead': 'hsla(0, 0%, 100%, 0.03)',
				// Overlay Colors
				'color-overlay': 'hsla(0, 0%, 0%, 0.38)',
				'color-overlay-subtle': 'hsla(0, 0%, 0%, 0.24)',
				'color-overlay-dead': 'hsla(0, 0%, 0%, 0)',
				// Accents Colors
				'color-accent': 'hsl(223, 66%, 54%)',
				'color-accent-darker': 'hsl(223, 66%, 34%)',
				'color-accent-subtle': 'hsla(223, 66%, 54%, 0.12)',
				'color-accent-lighter': 'hsl(223, 66%, 64%)',
				// Danger Colors
				'color-danger': 'hsl(360, 73%, 58%)',
				'color-danger-subtle': 'hsla(360, 73%, 58%, 0.12)',
				// PostStats Colors
				'color-star': 'hsl(43, 100%, 71%)',
				'color-star-subtle': 'hsla(43, 100%, 71%, 0.12)',
				'color-comment': 'hsl(219, 76%, 68%)',
				'color-comment-subtle': 'hsla(219, 76%, 68%, 0.12)',
				'color-repost': 'hsl(139, 47%, 44%)',
				'color-repost-subtle': 'hsla(139, 47%, 44%, 0.12)',
			},
			fontWeight: {
				regular: 450,
				semibold: 600,
				bold: 700,
			},
			lineHeight: {
				defualt: '100%',
				normal: 'normal',
			},
			fontSize: {
				xs: '0.75rem', // 12px
				sm: '0.875rem', // 14px
				base: '1rem', // 16px
				lg: '1.125rem', // 18px
				xl: '1.375rem', // 22px
				xxl: '1.75rem', // 28px
				xxl2: '2rem', // 32px
				xxl3: '4rem', // 64px
			},
			opacity: {
				100: '1',
				87: '.87',
				68: '.68',
				48: '.48',
				12: '.12',
				0.6: '0.6',
				0.3: '0.3',
			},
			// opacity: {
			// 	1: 'full',
			// 	0.87: 'high',
			// 	0.68: 'medium',
			// 	0.48: 'low',
			// 	0.12: 'subtle',
			// 	0.06: 'minimal',
			// 	0.03: 'invisible',
			// },
			zIndex: {
				100: '100',
			},
		},
	},
	corePlugins: {
		aspectRatio: true,
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
	],
}
