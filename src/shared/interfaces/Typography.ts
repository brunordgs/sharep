import { FONT_WEIGHTS } from '../constants';

export interface Typography {
	weight?: keyof typeof FONT_WEIGHTS;
	transform?: 'normal-case' | 'uppercase' | 'lowercase' | 'capitalize' | 'italic';
}
