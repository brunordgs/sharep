import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { LinkButton } from '@/components/ui/Buttons/LinkButton';
import { Command, Newspaper, PaintBrush, Question } from '@phosphor-icons/react/dist/ssr';
import { getServerSession } from 'next-auth';
import { createElement } from 'react';
import { Button } from '../ui/button';
import { Logo } from './logo';
import { NavLink } from './nav-link';
import { UserNav } from './user-nav';

export async function Navbar() {
	const session = await getServerSession(authOptions);

	const navLinks = [
		{
			link: '/',
			text: 'Projects',
			icon: Newspaper,
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
		<header className="border-b border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-lg py-5 bg-zinc-100 dark:bg-zinc-900 sticky top-0 z-20">
			{/* Desktop navbar */}
			<div className="container hidden lg:flex items-center">
				<div className="flex-1">
					<nav className="flex">
						<Logo />

						<ul className="flex items-center gap-6 border-l-4 border-rose-500 px-8 ml-8 font-bold text-zinc-700 dark:text-zinc-300">
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
					<Button
						type="button"
						variant="secondary"
						className="text-muted-foreground md:w-64 md:px-4 gap-2 group hover:bg-zinc-700"
						// onClick={() => setAction('command-menu')}
						// leftIcon={Search}
					>
						<span className="hidden md:flex flex-1">Search...</span>

						<div className="flex items-center gap-px text-xs font-mono group-hover:bg-background px-1.5 bg-zinc-700 border rounded">
							<Command size={14} /> <kbd>K</kbd>
						</div>
						{/* <Device>
              {({ isMacOs }) => (
                <div className="pointer-events-none h-5 hidden lg:flex gap-1 select-none items-center rounded border bg-muted group-hover:bg-background px-1.5 font-mono text-xs font-semibold text-muted-foreground opacity-100">
                  {isMacOs ? <Command className="w-3" /> : <kbd>CTRL</kbd>}
                  <kbd>K</kbd>
                </div>
              )}
            </Device> */}
					</Button>

					{session ? (
						<UserNav user={session.user} />
					) : (
						<LinkButton href="/auth/signup" variant="destructive">
							Sign up
						</LinkButton>
					)}
				</div>
			</div>
		</header>
	);
}
