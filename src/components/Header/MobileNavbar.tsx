import Link from 'next/link';
import { List } from 'phosphor-react';
import { Button } from '../ui/Buttons/Button';
import { Container } from '../ui/Container';

export function MobileNavbar() {
	return (
		<Container className="flex items-center justify-between lg:hidden">
			<div className="flex-1">
				<nav className="flex">
					<Link href="/">
						<a className="text-2xl italic font-bold text-rose-600 dark:text-rose-500 hover:text-rose-500 dark:hover:text-rose-600 transition-colors duration-300">
							sharep
						</a>
					</Link>

					{/* NOTE: Should be removed soon, for testing purposes */}
					<div className="uppercase italic font-bold text-zinc-600 dark:text-zinc-200 text-[10px] flex items-end ml-2 select-none">
						<span className="bg-zinc-200 dark:bg-zinc-800 rounded-[4px] px-2">Beta</span>
					</div>
				</nav>
			</div>

			<div className="uppercase font-bold text-zinc-600 dark:text-zinc-200 text-xs flex items-center ml-2 select-none gap-4">
				<span className="bg-zinc-200 dark:bg-zinc-800 rounded-[4px] p-2">Early preview</span>

				<Button type="button" color="unstyled">
					<List size={24} />
				</Button>
			</div>

			{/* <div className="flex items-center gap-4">
				{!session ? (
					<Button variant="outlined" onClick={() => signIn('github')}>
						Sign in
					</Button>
				) : (
					<UserDropdown avatar={session?.user?.image!} />
				)}

				<Button type="button" color="unstyled">
					<List size={24} />
				</Button>
			</div> */}
		</Container>
	);
}
