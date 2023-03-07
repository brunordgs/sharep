import { Loading } from '@/components/ui/Loading';
import { Text } from '@/components/ui/Typography/Text';
import { axios } from '@/services/axios';
import { type ShortUser } from '@/shared/interfaces/ShortUser';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Card } from '../../ui/Card';
import { Heading } from '../../ui/Typography/Heading';
	import { FeaturedUserCard } from './FeaturedUserCard';

export function FeaturedUsersCard() {
	const { data: users, isLoading } = useQuery<ShortUser[]>(
		'users',
		async () => {
			const { data } = await axios.get('/users');
			return data;
		},
		{ refetchOnWindowFocus: false },
	);

	const shuffledUsers = useMemo(() => {
		if (!users) {
			return [];
		}

		const shuffledUsers = users
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.slice(0, 4)
			.map(({ value }) => value);

		return shuffledUsers;
	}, [users]);

	return (
		<Card className="py-6" noPadding>
			<Loading loading={isLoading}>
				<aside>
					<Heading as="h2" transform="italic" className="text-xl mb-4 px-6">
						Featured users
					</Heading>

					{shuffledUsers.length > 0 ? (
						shuffledUsers.map(({ name, username, isVerified, image }) => (
							<FeaturedUserCard
								key={username}
								name={name as string}
								image={image as string}
								username={username}
								isVerified={isVerified}
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
