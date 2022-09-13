import { useColorTheme } from '@/hooks/useColorTheme';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Article, Moon, PaintBrush, Question, Sun } from 'phosphor-react';
import { Container } from '../ui/Container';
import { MobileNavbar } from './Mobile/MobileNavbar';

export function Navbar() {
	const router = useRouter();
	const { theme, setTheme, nextTheme } = useColorTheme();

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
						<Link href="/">
							<a className="text-2xl italic font-extrabold text-rose-600 dark:text-rose-500 hover:text-rose-500 dark:hover:text-rose-600 transition-colors duration-300">
								sharep
							</a>
						</Link>

						{/* NOTE: Should be removed soon, for testing purposes */}
						<div className="uppercase italic font-bold text-zinc-600 dark:text-zinc-200 text-xs flex items-end ml-2 select-none">
							<span className="bg-zinc-200 dark:bg-zinc-800 rounded-[4px] px-2">Beta</span>
						</div>

						<ul className="flex items-center gap-6 border-l-4 border-rose-600 px-8 ml-8 font-bold text-zinc-700 dark:text-zinc-300">
							{menuItems.map(({ link, text, icon: Icon, isActive }) => (
								<li key={link}>
									<Link href={link}>
										<a
											className={clsx(
												isActive && 'text-black dark:text-white',
												'flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors duration-300',
											)}
										>
											<Icon size={20} weight="bold" />
											{text}
										</a>
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>

				<div className="uppercase font-bold text-zinc-600 dark:text-zinc-200 text-xs flex items-end ml-2 select-none">
					<span className="bg-zinc-200 dark:bg-zinc-800 rounded-[4px] p-2">Early preview</span>
				</div>

				<div className="border-l border-l-zinc-300 dark:border-l-zinc-700 pl-4 ml-4">
					<button
						className="flex items-center gap-2 flex-row-reverse dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors duration-300"
						onClick={() => setTheme(nextTheme)}
						title="Update theme"
					>
						{theme === 'light' || !theme ? (
							<Moon weight="bold" size={18} aria-label="Dark mode" />
						) : (
							<Sun weight="bold" aria-label="Light mode" />
						)}
					</button>
				</div>

				{/* <div className="flex items-center gap-4">
					<div className="flex items-center h-10 w-56 bg-zinc-200 dark:bg-zinc-700 gap-2 px-4 rounded-md">
						<MagnifyingGlass weight="bold" size={24} className="text-zinc-600 dark:text-zinc-500" />

						<input
							type="text"
							className="bg-zinc-200 dark:bg-zinc-700 px-2 w-full h-full focus:outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
							placeholder="Search..."
						/>
					</div>

					{!session ? (
						<Button variant="outlined" onClick={() => signIn('github')}>
							Sign in
						</Button>
					) : (
						<UserDropdown avatar={session?.user?.image!} />
					)}
				</div> */}
			</Container>

			<MobileNavbar />
		</header>
	);
}
