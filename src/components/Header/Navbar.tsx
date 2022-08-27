import Link from 'next/link';
import { Article, MagnifyingGlass, Question } from 'phosphor-react';
import { Container } from '../Container';
import { Button } from '../ui/Buttons/Button';
import { MobileNavbar } from './MobileNavbar';

export function Navbar() {
	return (
		<header className="border-b border-zinc-200 shadow-sm py-5">
			{/* Desktop navbar */}
			<Container className="hidden lg:flex items-center">
				<div className="flex-1">
					<nav className="flex">
						<Link href="/">
							<a className="text-2xl italic font-bold text-rose-600 hover:text-rose-500 transition-colors duration-300">
								sharep
							</a>
						</Link>

						<ul className="flex items-center gap-6 border-l-4 border-rose-600 px-8 ml-8 font-bold text-zinc-800">
							<li>
								<Link href="/">
									<a className="flex items-center gap-2">
										<Article size={20} weight="bold" />
										Projects
									</a>
								</Link>
							</li>

							<li>
								<Link href="/about">
									<a className="flex items-center gap-2">
										<Question size={20} weight="bold" />
										About
									</a>
								</Link>
							</li>
						</ul>
					</nav>
				</div>

				<div className="flex items-center gap-4">
					<div className="flex items-center h-10 w-56 bg-zinc-200 gap-2 px-4 rounded-md">
						<MagnifyingGlass weight="bold" size={24} className="text-zinc-600" />

						<input
							type="text"
							className="bg-zinc-200 px-2 w-full h-full focus:outline-none placeholder:text-zinc-400"
							placeholder="Search..."
						/>
					</div>

					<Button type="button" variant="outlined">
						Sign in
					</Button>
				</div>
			</Container>

			<MobileNavbar />
		</header>
	);
}
