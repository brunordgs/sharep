import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { Newspaper, Question, SquaresFour } from '@phosphor-icons/react/dist/ssr';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { createElement } from 'react';
import { FaGithub } from 'react-icons/fa';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { LinkButton } from '../ui/link-button';
import { Logo } from './logo';
import { MenuItem } from './menu-item';
import { SearchButton } from './search-button';
import { UserNav } from './user-nav';

export async function Navbar() {
	const session = await getServerSession(authOptions);

	const menuItems = [
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

						<ul className="flex items-center gap-2 border-l-4 border-rose-500 pl-4 ml-6 font-bold text-zinc-700 dark:text-zinc-300">
							{menuItems.map(({ link, text, icon }) => (
								<MenuItem key={link} link={link} text={text}>
									{createElement(icon, {
										size: 20,
										weight: 'bold',
									})}
								</MenuItem>
							))}
						</ul>
					</nav>
				</div>

				<div className="flex items-center gap-4">
					<SearchButton />

					{session ? (
						<UserNav user={session.user} />
					) : (
						<div className="flex items-center gap-2">
							<LinkButton href="/auth/signin" variant="secondary">
								Sign in
							</LinkButton>
							<LinkButton href="/auth/signup">Sign up</LinkButton>

							<TooltipProvider delayDuration={0}>
								<Tooltip>
									<TooltipTrigger>
										<Link
											href="https://github.com/brunordgs/sharep"
											className="block hover:scale-105 hover:opacity-80 duration-300 transition ml-2"
											target="_blank"
											rel="noreferrer"
										>
											<FaGithub size={24} />
										</Link>
									</TooltipTrigger>

									<TooltipContent>
										<p>Contribute on GitHub</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
