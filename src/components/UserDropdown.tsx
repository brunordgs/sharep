import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SignOut, User } from 'phosphor-react';
import { Fragment } from 'react';
import { Avatar } from './ui/Avatar';

interface Props {
	avatar: string;
}

export function UserDropdown({ avatar }: Props) {
	const router = useRouter();

	const items = [
		{
			text: 'Profile',
			icon: User,
			onClick: () => router.push(`/@brunordgs`),
		},
		{
			text: 'Sign out',
			icon: SignOut,
			onClick: () => signOut(),
		},
	];

	return (
		<Menu as="div" className="relative flex text-left">
			<Menu.Button>
				<Avatar src={avatar} size="sm" />
			</Menu.Button>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 top-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
					<div className="p-1">
						{items.map(({ text, icon: Icon, onClick }) => (
							<Menu.Item key={text}>
								{({ active }) => (
									<button
										onClick={onClick}
										className={clsx(
											{ 'bg-zinc-100 dark:bg-zinc-700': active },
											'flex gap-2 w-full items-center rounded-md p-2 text-sm text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-300',
										)}
									>
										<Icon weight="bold" />
										{text}
									</button>
								)}
							</Menu.Item>
						))}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
