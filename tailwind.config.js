/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.tsx'],
	darkMode: 'class',
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				xl: '5rem',
				'2xl': '6rem',
			},
		},
		extend: {
			fontFamily: {
				sans: ['var(--font-inter)', ...fontFamily.sans],
			},
			screens: {
				mobile: { raw: '(max-width: 1024px)' },
			},
		// outlineColor: {
		// 		DEFAULT: '#bd93f9'
		// 	},
		// 	ringColor: {
		// 		DEFAULT: '#bd93f9',
		// 	},
		},
	},
	plugins: [],
};
