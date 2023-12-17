import { axios } from '@/services/axios';
import { type UserProfile } from '@/shared/interfaces/UserProfile';
import { Avatar } from '@ui/Avatar';
import { Loading } from '@ui/Loading';
import { Text } from '@ui/Typography/Text';
import { cx } from 'class-variance-authority';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PaintBrush, User } from 'phosphor-react';
import { useQuery } from 'react-query';

export function SideNavigation() {
	const session = useSession();
	const router = useRouter();

	const menuItems = [
		{
			link: '/settings/account',
			text: 'Profile',
			icon: User,
			isCurrentItem: router.pathname === '/settings/account',
			disabled: false,
		},
		{
			link: '/settings/creators',
			text: 'Creators',
			icon: PaintBrush,
			isCurrentItem: router.pathname === '/settings/creators',
			disabled: !session.data?.user.isVerified, // TODO: User verification should be "isAdmin" or something like that
		},
	];

	const { data: user, isLoading } = useQuery<UserProfile>(
		['user', session.data?.user.username],
		async () => {
			const { data } = await axios.get(`/users/${session.data?.user.username}`);

			return data;
		},
	);

	if (isLoading || !user) {
		return (
			<div className="h-0 my-6">
				<Loading loading={isLoading} />
			</div>
		);
	}

	return (
		<aside>
			<Link
				href={`/@${user.username}`}
				className="flex items-start gap-4 mb-4 lg:mb-0 mr-4 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md p-2 transition-all"
			>
				<Avatar src={user.image} size="base" />

				<div className="flex-1">
					<Text weight="bold" className="truncate w-44 xl:w-48" title={user.name}>
						{user.name}
					</Text>
					<Text size="xs" className="dark:text-zinc-400">
						@{user.username}
					</Text>
				</div>
			</Link>

			<ul className="mt-6 font-medium">
				{menuItems.map(({ link, text, icon: Icon, isCurrentItem, disabled }) => (
					<li
						key={link}
						className={cx(
							{
								hidden: disabled,
							},
							'pl-4 relative',
						)}
					>
						<Link
							href={link}
							className={cx(
								{
									'font-bold text-black dark:text-white after:content-[""] after:w-1 after:h-10 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:bg-rose-500 after:rounded-full':
										isCurrentItem,
								},
								'flex items-center gap-4 hover:text-black dark:hover:text-white transition-all text-[15px] leading-none py-4',
							)}
						>
							<Icon size={16} weight="bold" aria-label={text} />
							{text}
						</Link>
					</li>
				))}
			</ul>
		</aside>
	);
}
