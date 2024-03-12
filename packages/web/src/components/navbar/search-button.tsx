'use client';
import { Button } from '../ui/button';
import { ChevronDown, ChevronUp, CommandIcon, CornerDownLeft, Search } from 'lucide-react';
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '../ui/command';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Newspaper, PaintBrush, Question, SquaresFour } from '@phosphor-icons/react';
import { Device } from '../device';

export function SearchButton() {
	const router = useRouter();

	const [commandOpen, setCommandOpen] = useState(false);

	useEffect(() => {
		function down(e: KeyboardEvent) {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setCommandOpen((open) => !open);
			}
		}

		document.addEventListener('keydown', down);

		return () => document.removeEventListener('keydown', down);
	}, []);

	return (
		<>
			<Button
				type="button"
				className="text-card-foreground font-normal w-10 lg:w-60 xl:w-64 lg:px-4 gap-2 group bg-card hover:bg-white/10 border"
				onClick={() => setCommandOpen(true)}
				leftIcon={Search}
			>
				<span className="hidden lg:flex flex-1">Search</span>

				<Device>
					{({ isMacOs }) => (
						<div className="flex items-center gap-1 text-xs font-mono group-hover:bg-background px-1.5 border rounded h-5">
							{isMacOs ? <CommandIcon className="w-3 h-3" /> : <kbd>CTRL</kbd>}
							<kbd>K</kbd>
						</div>
					)}
				</Device>
			</Button>

			<CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
				<CommandInput placeholder="Search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem
							role="button"
							onSelect={() => {
								router.push('/');
								setCommandOpen(false);
							}}
						>
							<Newspaper className="mr-2" />
							Products
						</CommandItem>
						<CommandItem
							role="button"
							onSelect={() => {
								router.push('/categories');
								setCommandOpen(false);
							}}
						>
							<SquaresFour className="mr-2" />
							Categories
						</CommandItem>
						<CommandItem
							role="button"
							onSelect={() => {
								router.push('/creators');
								setCommandOpen(false);
							}}
						>
							<PaintBrush className="mr-2" />
							Creators
						</CommandItem>
						<CommandItem
							role="button"
							onSelect={() => {
								router.push('/about');
								setCommandOpen(false);
							}}
						>
							<Question className="mr-2" />
							About
						</CommandItem>
					</CommandGroup>
				</CommandList>

				<div className="border-t px-4 py-3 hidden lg:flex items-center justify-end gap-4">
					<div className="flex items-center gap-1.5">
						<div className="flex items-center gap-1">
							<div className="border rounded bg-secondary h-5 w-5 flex items-center justify-center">
								<ChevronUp className="size-4 text-muted-foreground" />
							</div>
							<div className="border rounded bg-secondary h-5 w-5 flex items-center justify-center">
								<ChevronDown className="size-4 text-muted-foreground" />
							</div>
						</div>
						<span className="text-xs font-semibold text-muted-foreground lowercase">
							to navigate
						</span>
					</div>

					<div className="flex items-center gap-1.5">
						<div className="border rounded bg-secondary h-5 w-5 flex items-center justify-center">
							<CornerDownLeft className="size-4 text-muted-foreground" />
						</div>
						<span className="text-xs font-semibold text-muted-foreground lowercase">to select</span>
					</div>

					<div className="flex items-center gap-1.5">
						<div className="border rounded bg-secondary h-5 w-7 flex items-center justify-center">
							<span className="text-xs text-muted-foreground">esc</span>
						</div>
						<span className="text-xs font-semibold text-muted-foreground lowercase">to close</span>
					</div>
				</div>
			</CommandDialog>
		</>
	);
}
