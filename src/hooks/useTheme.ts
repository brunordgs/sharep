import { ThemeContext } from '@/contexts/ThemeContext';
import { useContext } from 'react';

export function useTheme() {
	const { theme, nextTheme, setTheme } = useContext(ThemeContext);

	return {
		theme,
		nextTheme,
		setTheme,
	};
}
