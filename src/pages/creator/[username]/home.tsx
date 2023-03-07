import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Text } from '@/components/ui/Typography/Text';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

export default function CreatorHome() {
	const session = useSession()

	return (
		<>
			<Head>
				<title>Home | Sharep</title>
			</Head>

			<Container className="grid lg:grid-cols-5 gap-8">
				<Card className="col-span-3">
					<Text size="4xl" weight="bold" className="text-center mb-10">
						Welcome back, {session.data?.user.username}!
					</Text>

					<div className="space-y-2">
						<Text size="lg" weight="semibold">
							Let's grow up our community!
						</Text>
						<Text size="sm">
							Post and interact with people, and build a community that helps each other.
						</Text>
					</div>
				</Card>

				<Card className="col-span-2">
					<Text size="2xl" weight="bold">
						Your actions
					</Text>
					<Text size="sm">Your journey begins here.</Text>

					<div className="border-b border-zinc-200 dark:border-zinc-700 my-4" />

					<Text size="lg">Help people get to know you when they visit your profile.</Text>
				</Card>
			</Container>
		</>
	);
}
