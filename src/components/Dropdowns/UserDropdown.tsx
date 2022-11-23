import { useTheme } from '@/hooks/useTheme';
import { Menu, Transition } from '@headlessui/react';
import { Moon, User } from 'phosphor-react';
import { Fragment } from 'react';
import { SigninDialog } from '../Modals/SigninDialog';
import { SwitchToggle } from '../ui/SwitchToggle';

export function UserDropdown() {
	const { theme, nextTheme, setTheme } = useTheme();

	return (
		<Menu as="div" className="relative flex text-left">
			<Menu.Button className="hover:bg-zinc-200/60 dark:hover:bg-zinc-700 w-[38px] h-[38px] rounded-md flex items-center justify-center transition-colors ease-out">
				<User weight="bold" size={20} />
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
						<Menu.Item>{({ active }) => <SigninDialog active={active} />}</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
