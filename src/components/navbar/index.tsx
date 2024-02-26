import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import {
	Newspaper,
	PaintBrush,
	Question,
	SquaresFour
} from '@phosphor-icons/react/dist/ssr';
import { UserRound } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { createElement } from 'react';
import { FaGithub } from 'react-icons/fa';
import { Button } from '../ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import { LinkButton } from '../ui/link-button';
import { Logo } from './logo';
import { NavLink } from './nav-link';
import { SearchButton } from './search-button';
import { UserNav } from './user-nav';

export async function Navbar() {
	const session = await getServerSession(authOptions);

	const navLinks = [
		{
			link: '/',
			text: 'Products',
			icon: Newspaper,
		},
		{
			link: '/categories',
			text: 'Categories',
			icon: SquaresFour,
		},
		{
			link: '/creators',
			text: 'Creators',
			icon: PaintBrush,
		},
		{
			link: '/about',
			text: 'About',
			icon: Question,
		},
	];

	return (
		<header className="border-b shadow-sm dark:shadow-lg py-5 sticky top-0 z-20">
			{/* Desktop navbar */}
			<div className="container hidden lg:flex items-center">
				<div className="flex-1">
					<nav className="flex">
						<Logo />

						<ul className="flex items-center gap-2 border-l-4 border-rose-500 pl-8 ml-8 font-bold text-zinc-700 dark:text-zinc-300">
							{navLinks.map(({ link, text, icon }) => (
								<NavLink key={link} link={link} text={text}>
									{createElement(icon, {
										size: 20,
										weight: 'bold',
									})}
								</NavLink>
							))}
						</ul>
					</nav>
				</div>

				<div className="flex items-center gap-4">
					<SearchButton />

					{session ? (
						<UserNav user={session.user} />
					) : (
						<Dialog>
							<DialogTrigger asChild>
								<Button>Sign in</Button>
							</DialogTrigger>
							<DialogContent className="max-w-md">
								<DialogHeader className="sm:text-center mb-6">
									<DialogTitle className="text-2xl font-bold">Sign in to Sharep</DialogTitle>
								</DialogHeader>

								<button
									type="button"
									className="flex items-center justify-center gap-2 w-full bg-zinc-200 hover:bg-zinc-200/90 dark:bg-zinc-800 dark:hover:bg-zinc-800/90 p-2 rounded-md font-medium hover:text-black dark:hover:text-white text-sm transition-colors ease-out relative"
									// onClick={() => signIn('github')}
								>
									<UserRound className="w-4 absolute left-4" /> Use email
								</button>

								<button
									type="button"
									className="flex items-center justify-center gap-2 w-full bg-zinc-200 hover:bg-zinc-200/90 dark:bg-zinc-800 dark:hover:bg-zinc-800/90 p-2 rounded-md font-medium hover:text-black dark:hover:text-white text-sm transition-colors ease-out relative"
									// onClick={() => signIn('github')}
								>
									<FaGithub size={18} className="absolute left-4" /> Continue with Github
								</button>

								<DialogFooter className="items-center sm:justify-center text-center sm:space-x-0 gap-2 text-sm border-t mt-4 pt-2">
									Don't have an account?{' '}
									<DialogClose asChild>
										<LinkButton href="/auth/signup" variant="link" className="px-0">
											Sign up
										</LinkButton>
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					)}
				</div>
			</div>
		</header>
	);
}
