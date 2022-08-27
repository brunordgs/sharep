import Link from 'next/link';
import { List } from 'phosphor-react';
import { Container } from '../Container';
import { Button } from '../ui/Buttons/Button';

export function MobileNavbar() {
	return (
		<Container className="flex items-center justify-between lg:hidden">
			<Link href="/">
				<a className="text-2xl italic font-bold text-rose-600 hover:text-rose-500 transition-colors duration-300">
					sharep
				</a>
			</Link>

			<div className="flex items-center gap-4">
				<Button type="button" variant="outlined">
					Sign in
				</Button>
				<Button type="button" color="unstyled">
					<List size={24} />
				</Button>
			</div>
		</Container>
	);
}
