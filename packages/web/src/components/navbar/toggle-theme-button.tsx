'use client';
import { Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Switch } from '../ui/switch';

export function ToggleThemeButton() {
	const { theme, setTheme } = useTheme();

	return (
		<div
			onClick={(e) => e.preventDefault()}
			className="flex items-center justify-between w-full cursor-default"
		>
			<div className="flex items-center gap-1.5">
				<Moon className="size-4" />
				Dark Theme
			</div>

			<Switch
				checked={theme === 'dark'}
				onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				className="w-8 h-4 [&>span]:w-3 [&>span]:h-3 [&>span]:data-[state=checked]:translate-x-4 [&>span]:bg-white"
			/>
		</div>
	);
}
