export const FONT_WEIGHTS = {
	inherit: '',
	light: 'font-light',
	normal: 'font-normal',
	medium: 'font-medium',
	semibold: 'font-semibold',
	bold: 'font-bold',
	extrabold: 'font-extrabold',
	black: 'font-black',
};

export const isProd = process.env.NODE_ENV === 'production';
export const HTTP_PROTOCOL_REGEX = /(?:www.|https:\/\/|\/$)+/g;
