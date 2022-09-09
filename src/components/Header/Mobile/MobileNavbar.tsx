import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Article, List, PaintBrush, Question, X } from 'phosphor-react';
import { useState } from 'react';
import { Dialog } from '../../Dialogs/Dialog';
import { Button } from '../../ui/Buttons/Button';
import { Container } from '../../ui/Container';
import { MobileItem } from './MobileItem';

export function MobileNavbar() {
	const [collapse, setCollapse] = useState(false);

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

				<Button type="button" color="unstyled" className="hover:text-black dark:hover:text-white" onClick={() => setCollapse(!collapse)}>
					{!collapse ? <List size={24} /> : <X size={24} />}
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

			{/* Mobile navbar content */}
			<AnimatePresence>
				{collapse && (
					<Dialog
						collapse={collapse}
						onCollapse={setCollapse}
						className="fixed top-[73px] right-0 bottom-0 left-0 bg-zinc-100 dark:bg-zinc-900 lg:hidden z-50"
					>
						<nav>
							<Container>
								<MobileItem href="/" onClick={() => setCollapse(false)}>
									<Article size={20} weight="bold" />
									Projects
								</MobileItem>

								<MobileItem href="/creators" onClick={() => setCollapse(false)}>
									<PaintBrush size={20} weight="bold" />
									Creators
								</MobileItem>

								<MobileItem href="/about" onClick={() => setCollapse(false)}>
									<Question size={20} weight="bold" />
									About
								</MobileItem>
							</Container>
						</nav>
					</Dialog>
				)}
			</AnimatePresence>
		</Container>
	);
}
