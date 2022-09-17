import { Footer } from '../../Footer';
import { Card } from '../../ui/Card';
import { Heading } from '../../ui/Typography/Heading';
import { PopularUserCard } from './PopularUserCard';

export function PopularUsersCard() {
	const popularUsers = [
		{
			name: 'Bruno Rodrigues',
			username: 'brunordgs',
		},
		{
			name: 'Leonardo Vargas',
			username: 'leovargasdev',
		},
	];

	return (
		<div className="hidden lg:block col-span-2">
			<Card className="mb-2 py-6" noPadding>
				<aside>
					<Heading as="h2" transform="italic" className="text-xl mb-4 px-6">
						Popular users
					</Heading>

					{popularUsers.map(({ name, username }) => (
						<PopularUserCard key={username} name={name} username={username} />
					))}
				</aside>
			</Card>

			<Footer />
		</div>
	);
}
