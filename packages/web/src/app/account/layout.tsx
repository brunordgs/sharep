import { SideNavigation, Props as SideNavigationProps } from '@/components/account/side-navigation';
import { Container } from '@/components/container';
import { Card } from '@/components/ui/card';
import { Children } from '@/shared/interfaces/Children';
import { parseJwt } from '@/utils/parse';
import { cookies } from 'next/headers';

export default async function AccountLayout({ children }: Children) {
	const session = cookies().get('token');
	const user = parseJwt(session?.value);
	
	return (
		<Container>
			<main className="grid grid-cols-1 lg:grid-cols-[25%_repeat(3,1fr)] 2xl:grid-cols-[20%_repeat(3,1fr)] gap-2">
				<SideNavigation user={user as SideNavigationProps['user']} />
				<Card className="col-span-3">{children}</Card>
			</main>
		</Container>
	);
}
