import { SignedInDropdown } from '@/components/Dropdowns/SignedInDropdown';
import { UserDropdown } from '@/components/Dropdowns/UserDropdown';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { Article, List, MagnifyingGlass, PaintBrush, Question, X } from 'phosphor-react';
import { useState } from 'react';
import { Container } from '@ui/Container';
import { Dialog } from '@ui/Dialogs/Dialog';
import { Logo } from '../Logo';
import { MobileItem } from './MobileItem';

export function MobileNavbar() {
	const [collapse, setCollapse] = useState(false);
	const breakpoint = useBreakpoint();
	const session = useSession();

	const userAvatar = session.data?.user.image;

	return (
		<Container noMargin className="flex items-center justify-between lg:hidden">
			<button
				className="flex items-center justify-center hover:bg-zinc-200/60 dark:hover:bg-zinc-700 w-[38px] h-[38px] rounded-md transition-colors ease-out"
				onClick={() => setCollapse(!collapse)}
			>
				{!collapse ? <List size={24} /> : <X size={24} />}
			</button>

			{breakpoint && breakpoint < 1024 ? <Logo /> : null}

			{session.status === 'unauthenticated' ? (
				<UserDropdown />
			) : (
				userAvatar && <SignedInDropdown avatar={userAvatar} />
			)}

			{/* Mobile navbar content */}
			<AnimatePresence>
				{collapse && (
					<Dialog
						collapse={collapse}
						onCollapse={setCollapse}
						className="fixed top-[81px] right-0 bottom-0 left-0 bg-zinc-100 dark:bg-zinc-900 lg:hidden z-50"
					>
						<Container className="flex justify-center mt-4 mb-2" noMargin>
							<div className="flex items-center h-10 w-full bg-zinc-200 dark:bg-zinc-700 gap-2 px-3 rounded-md">
								<MagnifyingGlass
									weight="bold"
									size={20}
									className="text-zinc-600 dark:text-zinc-500"
								/>

								<input
									type="text"
									className="bg-zinc-200 dark:bg-zinc-700 w-full h-full focus:outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm"
									placeholder="Search..."
								/>
							</div>
						</Container>

						<nav>
							<Container noMargin>
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
