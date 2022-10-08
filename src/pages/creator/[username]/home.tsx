import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Text } from '@/components/ui/Typography/Text';
import { useAuth } from '@/hooks/useAuth';
import Head from 'next/head';

export default function CreatorHome() {
	const auth = useAuth();

	return (
		<>
			<Head>
				<title>Home | Sharep</title>
			</Head>

			<Container className="grid lg:grid-cols-5 gap-8">
				<Card className="col-span-3">
					<Text size="4xl" weight="bold" className="text-center">Welcome back, {auth?.user.username}!</Text>

					<div>
						<Text>Let's grow up our community!</Text>
						<Text></Text>
					</div>
				</Card>

				<Card className="col-span-2">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos laudantium maxime nesciunt,
					dolorum, blanditiis, velit eligendi facilis porro itaque laboriosam quod adipisci
					praesentium assumenda officiis totam dignissimos consequatur iste recusandae?
				</Card>
			</Container>
		</>
	);
}
