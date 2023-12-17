import { Dispatch, SetStateAction } from 'react';
import { type Theme } from '../types/Theme';

export interface ThemeContext {
	theme: Theme;
	nextTheme: Theme;
	setTheme: Dispatch<SetStateAction<Theme>>;
}
