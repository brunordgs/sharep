import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { signOut } from '@/utils/supabase';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Gear, Moon, SignOut, User } from 'phosphor-react';
import { Fragment } from 'react';
import { Avatar } from './ui/Avatar';
import { SwitchToggle } from './ui/SwitchToggle';

interface Props {
	avatar: string;
}

export function UserDropdown({ avatar }: Props) {
	const router = useRouter();
	const { theme, nextTheme, setTheme } = useTheme();
	const auth = useAuth();

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
				<Menu.Items className="absolute right-0 top-10 mt-2 w-56 origin-top-right divide-y divide-zinc-100 dark:divide-zinc-700 px-1 rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<button
									onClick={() => router.push(`/@${auth?.user.username}`)}
									className={clsx(
										{ 'bg-zinc-100 dark:bg-zinc-700': active },
										'flex gap-2 w-full items-center rounded-md p-2 text-sm text-zinc-800 dark:text-zinc-200 transition-colors duration-150 ease-out',
									)}
								>
									<User weight="bold" />
									Profile
								</button>
							)}
						</Menu.Item>
					</div>

					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<button
									onClick={() => router.push('/settings/account')}
									className={clsx(
										{ 'bg-zinc-100 dark:bg-zinc-700': active },
										'flex gap-2 w-full items-center rounded-md p-2 text-sm text-zinc-800 dark:text-zinc-200  transition-colors duration-150 ease-out',
									)}
								>
									<Gear weight="bold" />
									Settings
								</button>
							)}
						</Menu.Item>

						<Menu.Item>
							<div className="flex gap-2 w-full items-center justify-between rounded-md p-2 text-sm text-zinc-800 dark:text-zinc-200">
								<div className="flex items-center gap-2">
									<Moon weight="bold" />
									Dark Mode
								</div>

								<SwitchToggle
									title="Toggle theme"
									enabled={theme === 'dark'}
									setEnabled={() => setTheme(nextTheme)}
								/>
							</div>
						</Menu.Item>
					</div>

					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<button
									onClick={async () => {
										const { error } = await signOut();

										if (!error) {
											router.reload();
										}
									}}
									className={clsx(
										{ 'bg-zinc-100 dark:bg-zinc-700': active },
										'flex gap-2 w-full items-center rounded-md p-2 text-sm text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-150 ease-out',
									)}
								>
									<SignOut weight="bold" />
									Sign Out
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
