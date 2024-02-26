'use client';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { getFallbackInitials } from '@/utils/helpers/format';
import { signOut } from 'next-auth/react';

interface Props {
	user: {
		image: string | null;
		name: string | null;
		username: string;
	};
}

export function UserNav({ user }: Props) {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage src={user.image!} alt={user.name!} />
						<AvatarFallback>{getFallbackInitials(user.name)}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuItem asChild>
					<Link href={`@${user.username}`} className="flex items-center gap-1.5">
						Profile
					</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<button
						className="flex items-center gap-1.5 w-full"
						onClick={() =>
							signOut({
								redirect: true,
								callbackUrl: '/',
							})
						}
					>
						Log out
					</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
