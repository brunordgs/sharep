/* eslint-disable no-undef */
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
				'inter': 'Inter',
			},
		},
	},
	plugins: [],
};
