import { useAuth } from '@/hooks/useAuth';
import { signIn } from '@/utils/supabase';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Article, MagnifyingGlass, PaintBrush, Question } from 'phosphor-react';
import { Button } from '../ui/Buttons/Button';
import { LinkButton } from '../ui/Buttons/LinkButton';
import { Container } from '../ui/Container';
import { UserDropdown } from '../UserDropdown';
import { MobileNavbar } from './Mobile/MobileNavbar';

export function Navbar() {
	const router = useRouter();
	const auth = useAuth();

	const menuItems = [
		{
			link: '/',
			text: 'Projects',
			icon: Article,
			isActive: router.pathname === '/',
		},
		{
			link: '/creators',
			text: 'Creators',
			icon: PaintBrush,
			isActive: router.pathname === '/creators',
		},
		{
			link: '/about',
			text: 'About',
			icon: Question,
			isActive: router.pathname === '/about',
		},
	];

	return (
		<header className="border-b border-zinc-200 dark:border-zinc-800 shadow-sm py-5">
			{/* Desktop navbar */}
			<Container className="hidden lg:flex items-center">
				<div className="flex-1">
					<nav className="flex">
						<LinkButton
							href="/"
							color="unstyled"
							className="text-2xl italic font-extrabold text-rose-600 dark:text-rose-500 hover:text-rose-500 dark:hover:text-rose-600"
						>
							sharep
						</LinkButton>

						{/* NOTE: Should be removed soon, for testing purposes */}
						<div className="uppercase italic font-bold text-zinc-600 dark:text-zinc-200 text-xs flex items-end ml-2 select-none">
							<span className="bg-zinc-200 dark:bg-zinc-800 rounded-[4px] px-2">Beta</span>
						</div>

						<ul className="flex items-center gap-6 border-l-4 border-rose-600 px-8 ml-8 font-bold text-zinc-700 dark:text-zinc-300">
							{menuItems.map(({ link, text, icon: Icon, isActive }) => (
								<li key={link}>
									<LinkButton
										href={link}
										color="unstyled"
										fontSize="base"
										className={clsx(
											isActive && 'text-black dark:text-white',
											'hover:text-black dark:hover:text-white',
										)}
									>
										<Icon size={20} weight="bold" />
										{text}
									</LinkButton>
								</li>
							))}
						</ul>
					</nav>
				</div>

				<div className="flex items-center gap-4">
					<div className="flex items-center h-10 w-56 bg-zinc-200 dark:bg-zinc-700 gap-2 px-3 rounded-md shadow-sm">
						<MagnifyingGlass weight="bold" size={20} className="text-zinc-600 dark:text-zinc-500" />

						<input
							type="text"
							className="bg-zinc-200 dark:bg-zinc-700 w-full h-full focus:outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm"
							placeholder="Search..."
						/>
					</div>

					{!auth?.session ? (
						<Button variant="outlined" onClick={signIn}>
							Sign in
						</Button>
					) : (
						<UserDropdown avatar={auth?.user?.image} />
					)}
				</div>
			</Container>

			<MobileNavbar />
		</header>
	);
}
