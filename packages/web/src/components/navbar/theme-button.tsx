'use client';
import { cn } from '@/lib/utils';
import { Check, Monitor, MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from '../ui/dropdown-menu';

export function ThemeButton() {
	const { theme, setTheme } = useTheme();

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger>
				<Sun className="size-4 mr-2" />
				Theme
			</DropdownMenuSubTrigger>
			<DropdownMenuPortal>
				<DropdownMenuSubContent className="space-y-1">
					<DropdownMenuItem asChild>
						<button
							type="button"
							onClick={() => setTheme('light')}
							className={cn(
								{ 'bg-secondary': theme === 'light' },
								'flex items-center justify-between cursor-pointer w-full',
							)}
						>
							<span className="flex items-center gap-2">
								<Sun className="size-4" />
								Light
							</span>
							{theme === 'light' && <Check className="size-4" />}
						</button>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<button
							type="button"
							onClick={() => setTheme('dark')}
							className={cn(
								{ 'bg-secondary': theme === 'dark' },
								'flex items-center justify-between cursor-pointer w-full',
							)}
						>
							<span className="flex items-center gap-2">
								<MoonStar className="size-4" />
								Dark
							</span>
							{theme === 'dark' && <Check className="size-4" />}
						</button>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<button
							type="button"
							onClick={() => setTheme('system')}
							className={cn(
								{ 'bg-secondary': theme === 'system' },
								'flex items-center justify-between cursor-pointer w-full',
							)}
						>
							<span className="flex items-center gap-2">
								<Monitor className="size-4" />
								System
							</span>
							{theme === 'system' && <Check className="size-4" />}
						</button>
					</DropdownMenuItem>
				</DropdownMenuSubContent>
			</DropdownMenuPortal>
		</DropdownMenuSub>
	);
}
