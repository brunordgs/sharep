import { Card } from '@ui/Card';

export function FeaturedUsersCard() {
	// const { data: users, isLoading } = useQuery<ShortUser[]>(
	// 	'users',
	// 	async () => {
	// 		const { data } = await axios.get('/users');
	// 		return data;
	// 	},
	// 	{ refetchOnWindowFocus: false },
	// );

	// const shuffledUsers = useMemo(() => {
	// 	if (!users) {
	// 		return [];
	// 	}

	// 	const shuffledUsers = users
	// 		.map((value) => ({ value, sort: Math.random() }))
	// 		.sort((a, b) => a.sort - b.sort)
	// 		.slice(0, 4)
	// 		.map(({ value }) => value);

	// 	return shuffledUsers;
	// }, [users]);

	return (
		<Card className="py-6" noPadding>
			{/* <Loading loading={isLoading}>
				<aside>
					<Heading as="h2" transform="italic" className="text-xl mb-4 px-6">
						Featured users
					</Heading>

					{shuffledUsers.length > 0 ? (
						shuffledUsers.map(({ username, ...rest }) => (
							null
							// <FeaturedUserItem key={username} username={username} {...rest} />
						))
					) : (
						<Text size="sm" className="px-6 text-zinc-400">
							There is no recent users yet.
						</Text>
					)}
				</aside>
			</Loading> */}
		</Card>
	);
}
