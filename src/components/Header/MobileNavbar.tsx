import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { List } from 'phosphor-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Buttons/Button';
import { UserDropdown } from '../User/UserDropdown';

export function MobileNavbar() {
	const { data: session } = useSession();

	return (
		<Container className="flex items-center justify-between lg:hidden">
			<Link href="/">
				<a className="text-2xl italic font-bold text-rose-600 hover:text-rose-500 transition-colors duration-300">
					sharep
				</a>
			</Link>

			<div className="flex items-center gap-4">
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
			</div>
		</Container>
	);
}
