'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { MagnifyingGlass, Newspaper, PaintBrush, Question } from '@phosphor-icons/react';
import { LinkButton } from '@/components/ui/Buttons/LinkButton';
import { Logo } from './Logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
	const pathname = usePathname();
	const session = useSession();

	const menuItems = [
		{
			link: '/',
			text: 'Projects',
			icon: Newspaper,
			isActive: pathname === '/',
		},
		{
			link: '/creators',
			text: 'Creators',
			icon: PaintBrush,
			isActive: pathname === '/creators',
		},
		{
			link: '/about',
			text: 'About',
			icon: Question,
			isActive: pathname === '/about',
		},
	];

	const userAvatar = session.data?.user.image;

	return (
		<header className="border-b border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-lg py-5 bg-zinc-100 dark:bg-zinc-900 sticky top-0 z-20">
			{/* Desktop navbar */}
			<div className="container hidden lg:flex items-center">
				<div className="flex-1">
					<nav className="flex">
						<Logo />

						<ul className="flex items-center gap-6 border-l-4 border-rose-600 px-8 ml-8 font-bold text-zinc-700 dark:text-zinc-300">
							{menuItems.map(({ link, text, icon: Icon, isActive }) => (
								<li key={link}>
									<Link
										href={link}
										className={cn(
											isActive && 'text-black dark:text-white',
											'hover:text-black dark:hover:text-white flex items-center gap-2 transition-all ease-out',
										)}
									>
										<Icon size={20} weight="bold" />
										{text}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>

				<div className="flex items-center gap-4">
					<div className="flex items-center h-10 bg-zinc-200 dark:bg-zinc-700 gap-2 px-3 rounded-md shadow-sm">
						<MagnifyingGlass weight="bold" size={20} className="text-zinc-600 dark:text-zinc-500" />

						<input
							type="text"
							className="bg-zinc-200 dark:bg-zinc-700 w-full h-full focus:outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm"
							placeholder="Search..."
						/>
					</div>

					{!session.data && (
						<div className="flex gap-1">
							<LinkButton href="/auth/signup">Sign up</LinkButton>
							{/* <UserDropdown /> */}
						</div>
					)}
					{/* <SignedInDropdown avatar={userAvatar} /> */}
				</div>
			</div>
		</header>
	);
}
