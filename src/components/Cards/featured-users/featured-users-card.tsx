import { Heading } from '@/components/ui/Typography/Heading';
import { Text } from '@/components/ui/Typography/Text';
import { prisma } from '@/lib/prisma';
import { Card } from '@ui/Card';
import { FeaturedUserItem } from './featured-users-item';

export async function FeaturedUsersCard() {
	const users = await prisma.user.findMany({
		select: {
			name: true,
			image: true,
			username: true,
			isVerified: true,
		},
	});

	const shuffledUsers = users
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.slice(0, 4)
		.map(({ value }) => value);

	return (
		<Card className="py-6" noPadding>
			<aside>
				<Heading as="h2" transform="italic" className="text-xl mb-4 px-6">
					Featured users
				</Heading>

				{shuffledUsers.length > 0 ? (
					shuffledUsers.map(({ username, ...rest }) => (
						<FeaturedUserItem key={username} username={username} {...rest} />
					))
				) : (
					<Text size="sm" className="px-6 text-zinc-400">
						There is no recent users.
					</Text>
				)}
			</aside>
		</Card>
	);
}
