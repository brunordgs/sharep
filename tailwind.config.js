/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.tsx'],
	darkMode: 'media',
	theme: {
		container: {
			center: true,
			padding: {
        DEFAULT: '1rem',
        sm: '2rem',
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
