import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

export function useColorTheme() {
	const { theme, nextTheme, setTheme } = useContext(ThemeContext);

	return {
		theme,
		nextTheme,
		setTheme,
	};
}
