import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Children } from '@/shared/interfaces/Children';
import { ThemeContext as ThemeContextProps } from '@/shared/interfaces/ThemeContext';
import { Theme } from '@/shared/types/Theme';
import { createContext, useEffect } from 'react';

const initialValue: ThemeContextProps = {
	theme: 'light',
	nextTheme: 'dark',
	setTheme: () => 'light' || 'dark',
};

export const ThemeContext = createContext(initialValue);

export function ThemeProvider({ children }: Children) {
	const colorSchemeQueryList = global.window?.matchMedia('(prefers-color-scheme: dark)');
	const isDarkMode = global.window?.matchMedia('(prefers-color-scheme: dark)').matches;

	const [theme, setTheme] = useLocalStorage<Theme>('theme', isDarkMode ? 'dark' : 'light');

	const colorTheme = theme === 'dark' ? 'light' : 'dark';

	function setColorScheme(e: MediaQueryListEvent | MediaQueryList) {
		return e.matches ? setTheme('dark') : setTheme('light');
	}

	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove(colorTheme);
		root.classList.add(theme);

		// Update color scheme on change operating system dark mode
		setColorScheme(colorSchemeQueryList as MediaQueryList);
		(colorSchemeQueryList as MediaQueryList).addEventListener('change', setColorScheme);

		setTheme(theme);
	}, [theme, isDarkMode]);

	return (
		<ThemeContext.Provider value={{ theme, nextTheme: colorTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
