import { SideNavigation } from '@/components/Settings/SideNavigation';
import { type Children } from '@/shared/interfaces/Children';
import { Card } from '@ui/Card';
import { Container } from '@ui/Container';

export function AccountLayout({ children }: Children) {
	return (
		<Container>
			<main className="grid grid-cols-1 lg:grid-cols-[25%_repeat(3,1fr)] 2xl:grid-cols-[20%_repeat(3,1fr)] gap-2">
				<SideNavigation />
				<Card className="col-span-3">{children}</Card>
			</main>
		</Container>
	);
}
