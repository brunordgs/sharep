import { SideNavigation, Props as SideNavigationProps } from '@/components/account/side-navigation';
import { Container } from '@/components/container';
import { Card } from '@/components/ui/card';
import { Children } from '@/shared/interfaces/Children';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/auth';

export default async function AccountLayout({ children }: Children) {
	const session = await getServerSession(authOptions);

	return (
		<Container>
			<main className="grid grid-cols-1 lg:grid-cols-[25%_repeat(3,1fr)] 2xl:grid-cols-[20%_repeat(3,1fr)] gap-2">
				<SideNavigation user={session?.user as SideNavigationProps['user']} />
				<Card className="col-span-3">{children}</Card>
			</main>
		</Container>
	);
}
