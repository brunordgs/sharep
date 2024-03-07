'use client';
import { cn } from '@/lib/utils';
import { Monitor, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createElement } from 'react';
import { Text } from '../ui/typography/text';
import { Avatar, AvatarImage } from '../ui/avatar';

export interface Props {
	user: {
		name: string;
		username: string;
		image: string;
	};
}

export function SideNavigation({ user }: Props) {
	const pathname = usePathname();

	const sideItems = [
		{
			url: '/account/profile',
			text: 'Profile',
			icon: User,
			active: pathname === '/account/profile',
		},
		{
			url: '/account/display',
			text: 'Display',
			icon: Monitor,
			active: pathname === '/account/display',
		},
	];

	return (
		<aside>
			<Link
				href={`/@${user.username}`}
				className="flex items-start gap-2 mb-4 lg:mb-0"
			>
				<Avatar>
					<AvatarImage src={user.image} />
				</Avatar>

				<div className="flex-1">
					<Text weight="bold" className="truncate w-44 xl:w-48" title={user.name}>
						{user.name}
					</Text>
					<Text size="xs" className="dark:text-zinc-400">
						@{user.username}
					</Text>
				</div>
			</Link>

			<ul className="mt-6 font-medium space-y-1">
				{sideItems.map(({ url, text, icon, active }) => (
					<li key={url}>
						<Link
							href={url}
							className={cn(
								{
									'bg-secondary font-semibold': active,
									'hover:text-black dark:hover:text-white': !active,
								},
								'flex items-center gap-4 transition-all text-[15px] leading-none py-2 px-3 rounded-md hover:bg-secondary',
							)}
						>
							{createElement(icon, {
								size: 20,
								'aria-label': text,
							})}
							{text}
						</Link>
					</li>
				))}
			</ul>
		</aside>
	);
}
