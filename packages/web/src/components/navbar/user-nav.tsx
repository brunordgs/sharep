import { getFallbackInitials } from '@/utils/format';
import { PaintBrush } from '@phosphor-icons/react/dist/ssr';
import { Settings, Star, UserRound } from 'lucide-react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { LogOutButton } from './log-out-button';
import { ToggleThemeButton } from './toggle-theme-button';

interface Props {
	user: {
		image: string | null;
		name: string | null;
		username: string;
		isCreator?: boolean;
	};
}

export function UserNav({ user }: Props) {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative size-8 rounded-full">
					<Avatar className="size-8">
						<AvatarImage src={user.image!} alt={user.name!} />
						<AvatarFallback>{getFallbackInitials(user.name)}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel>
					<p>{user.name}</p>
					<p className="text-xs leading-none text-muted-foreground">@{user.username}</p>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<Link href={`/@${user.username}`} className="flex items-center gap-1.5 cursor-pointer">
						<UserRound className="size-4" />
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href={`/@${user.username}`} className="flex items-center gap-1.5 cursor-pointer">
						<Star className="size-4" />
						Favorite products
					</Link>
				</DropdownMenuItem>
				{user.isCreator && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Link href="/dashboard" className="flex items-center gap-1.5 cursor-pointer">
								<PaintBrush className="size-4" />
								Creator dashboard
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
					</>
				)}
				<DropdownMenuItem asChild>
					<Link href="/account/profile" className="flex items-center gap-1.5 cursor-pointer">
						<Settings className="size-4" />
						Settings
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem>
					<ToggleThemeButton />
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<Link
						href="https://github.com/brunordgs/sharep"
						className="flex items-center gap-1.5 cursor-pointer"
						target="_blank"
						rel="noreferrer"
					>
						<FaGithub className="size-4" />
						Contribute on GitHub
					</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem>
					<LogOutButton />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
