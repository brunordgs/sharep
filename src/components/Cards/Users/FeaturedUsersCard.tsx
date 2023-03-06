import { Loading } from '@/components/ui/Loading';
import { Text } from '@/components/ui/Typography/Text';
import { type ShortUser } from '@/shared/interfaces/ShortUser';
import { useEffect, useState } from 'react';
import { Card } from '../../ui/Card';
import { Heading } from '../../ui/Typography/Heading';
import { FeaturedUserCard } from './FeaturedUserCard';

export function FeaturedUsersCard() {
	const [users, setUsers] = useState<ShortUser[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function initializeAsync() {
			const res = await selectUsers();

			if (res.data) {
				const shuffledUsers = res.data
					.map((value) => ({ value, sort: Math.random() }))
					.sort((a, b) => a.sort - b.sort)
					.slice(0, 4)
					.map(({ value }) => value);

				setUsers(shuffledUsers);
			}

			setLoading(false);
		}

		initializeAsync();
	}, []);

	return (
		<Card className="py-6" noPadding>
			<Loading loading={loading}>
				<aside>
					<Heading as="h2" transform="italic" className="text-xl mb-4 px-6">
						Featured users
					</Heading>

					{users.length ? (
						users.map(({ name, username, is_verified: isVerified, avatar_url: avatarUrl }) => (
							<FeaturedUserCard
								key={username}
								name={name}
								username={username}
								isVerified={isVerified}
								avatarUrl={avatarUrl}
							/>
						))
					) : (
						<Text size="sm" className="px-6 text-zinc-400">
							There is no recent users yet.
						</Text>
					)}
				</aside>
			</Loading>
		</Card>
	);
}
