import { useTheme } from '@/hooks/useTheme';
import { Menu, Transition } from '@headlessui/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Gear, Moon, PaintBrush, SignOut, User } from 'phosphor-react';
import { Fragment } from 'react';
import { Avatar } from '@ui/Avatar';
import { SwitchToggle } from '@ui/SwitchToggle';
import { cx } from 'class-variance-authority';

interface Props {
	avatar: string;
}

export function SignedInDropdown({ avatar }: Props) {
	const router = useRouter();
	const { theme, nextTheme, setTheme } = useTheme();
	const session = useSession();

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
				<Menu.Items className="absolute right-0 top-10 mt-2 w-56 origin-top-right divide-y divide-zinc-100 dark:divide-zinc-700 px-1 rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30">
					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<Link
									href={`/@${session.data?.user.username}`}
									className={cx(
										{ 'bg-zinc-100 dark:bg-zinc-700': active },
										'flex gap-2 w-full items-center rounded-md p-2 text-sm text-zinc-800 dark:text-zinc-200 transition-colors ease-out',
									)}
								>
									<User weight="bold" />
									Profile
								</Link>
							)}
						</Menu.Item>

						{/* TODO: Remove hardcoded username */}
						{(session.data?.user.isCreator || session.data?.user.username === 'brunordgs') && (
							<Menu.Item>
								{({ active }) => (
									<Link
										href={`/creator/${session.data?.user.username}/home`}
										className={cx(
											{ 'bg-zinc-100 dark:bg-zinc-700': active },
											'flex gap-2 w-full items-center rounded-md p-2 text-sm text-zinc-800 dark:text-zinc-200 transition-colors ease-out',
										)}
									>
										<PaintBrush weight="bold" />
										Creator Dashboard
									</Link>
								)}
							</Menu.Item>
						)}
					</div>

					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<Link
									href={'/settings/account'}
									className={cx(
										{ 'bg-zinc-100 dark:bg-zinc-700': active },
										'flex gap-2 w-full items-center rounded-md p-2 text-sm text-zinc-800 dark:text-zinc-200  transition-colors ease-out',
									)}
								>
									<Gear weight="bold" />
									Settings
								</Link>
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
										const data = await signOut({
											redirect: false,
											callbackUrl: '/',
										});

										router.push(data.url);
									}}
									className={cx(
										{ 'bg-zinc-100 dark:bg-zinc-700': active },
										'flex gap-2 w-full items-center rounded-md p-2 text-sm text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors ease-out',
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
