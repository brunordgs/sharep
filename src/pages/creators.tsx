import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Typography/Heading';
import { PopularUsersCard } from '@/components/Cards/Users/PopularUsersCard';
import { CreatorCard } from '@/components/Cards/Creators/CreatorCard';
import Head from 'next/head';

export default function Creators() {
	const creators = [
		{
			name: 'Leonardo Vargas',
			username: 'leovargasdev',
		},
	];

	return (
		<>
			<Head>
				<title>Creators | sharep</title>
			</Head>

			<Container className="my-6">
				<Heading transform="italic" size="lg" className="flex items-end gap-2">
					Awesome creators
				</Heading>

				<div className="grid grid-cols-1 lg:grid-cols-6 grid-rows-2 gap-8 mt-6">
					<Card className="lg:col-span-4 row-span-2" noPadding>
						{creators.map(({ name, username }) => (
							<CreatorCard key={username} name={name} username={username} />
						))}
					</Card>

					<PopularUsersCard />
				</div>
			</Container>
		</>
	);
}
