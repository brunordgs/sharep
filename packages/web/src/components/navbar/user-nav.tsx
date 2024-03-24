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
import { SignOutButton } from './sign-out-button';
import { ThemeButton } from './theme-button';

interface Props {
	image: string;
	name: string;
	username: string;
	isCreator?: boolean;
}

export function UserNav({ name, image, username, isCreator }: Props) {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative size-8 rounded-full">
					<Avatar className="size-8">
						<AvatarImage src={image!} alt={name!} />
						<AvatarFallback>{getFallbackInitials(name)}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel>
					<p>{name}</p>
					<p className="text-xs leading-none text-muted-foreground">@{username}</p>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<Link href={`/@${username}`} className="flex items-center gap-1.5 cursor-pointer">
						<UserRound className="size-4" />
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href={`/@${username}`} className="flex items-center gap-1.5 cursor-pointer">
						<Star className="size-4" />
						Favorite products
					</Link>
				</DropdownMenuItem>
				{isCreator && (
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

				<ThemeButton />

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
					<SignOutButton />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
