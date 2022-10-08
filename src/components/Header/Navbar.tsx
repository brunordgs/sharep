import { useAuth } from '@/hooks/useAuth';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Article, MagnifyingGlass, PaintBrush, Question } from 'phosphor-react';
import { SigninDialog } from '../Modals/SigninDialog';
import { LinkButton } from '../ui/Buttons/LinkButton';
import { Container } from '../ui/Container';
import { UserDropdown } from '../UserDropdown';
import { Logo } from './Logo';
import { MobileNavbar } from './Mobile/MobileNavbar';

export function Navbar() {
	const router = useRouter();
	const auth = useAuth();

	const menuItems = [
		{
			link: '/',
			text: 'Products',
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
		<header className="border-b border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-lg py-5 bg-zinc-100 dark:bg-zinc-900 sticky top-0 z-20">
			{/* Desktop navbar */}
			<Container noMargin className="hidden lg:flex items-center">
				<div className="flex-1">
					<nav className="flex">
						<Logo />

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
					<div className="flex items-center h-10 bg-zinc-200 dark:bg-zinc-700 gap-2 px-3 rounded-md shadow-sm">
						<MagnifyingGlass weight="bold" size={20} className="text-zinc-600 dark:text-zinc-500" />

						<input
							type="text"
							className="bg-zinc-200 dark:bg-zinc-700 w-full h-full focus:outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm"
							placeholder="Search..."
						/>
					</div>

					{!auth?.session ? <SigninDialog /> : <UserDropdown avatar={auth?.user?.image} />}
				</div>
			</Container>

			<MobileNavbar />
		</header>
	);
}
