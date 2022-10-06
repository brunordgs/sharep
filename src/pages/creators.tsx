import { CreatorCard } from '@/components/Cards/Creators/CreatorCard';
import { NoCreatorFound } from '@/components/Cards/Creators/NoCreatorFound';
import { FeaturedUsersCard } from '@/components/Cards/Users/FeaturedUsersCard';
import { Alert } from '@/components/ui/Alert';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Loading } from '@/components/ui/Loading';
import { Heading } from '@/components/ui/Typography/Heading';
import { supabase } from '@/services/supabaseClient';
import { ShortUser } from '@/shared/interfaces/ShortUser';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Creators() {
	const [creators, setCreators] = useState<ShortUser[]>([]);
	const [loading, setLoading] = useState(true);
	const [isAlertOpen, setIsAlertOpen] = useState(true);

	useEffect(() => {
		async function initializeAsync() {
			const res = await supabase.from('users').select().eq('is_creator', true);

			if (res.data) {
				setCreators(res.data);
			}

			setLoading(false);
		}

		initializeAsync();
	}, []);

	return (
		<>
			<Head>
				<title>Creators | sharep</title>
			</Head>

			<Container className="my-6">
				<div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mt-6">
					<div className="lg:col-span-4 space-y-4">
					<div className="flex item-start lg:items-center justify-between flex-col lg:flex-row gap-4">
							<Heading transform="italic" size="lg" className="flex items-end gap-2">
								Awesome creators
							</Heading>

							<input
								type="text"
								className="bg-zinc-200 dark:bg-zinc-700 h-10 focus:outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-sm rounded-md px-4"
								placeholder="Search..."
							/>
						</div>

						<div className="border-b border-zinc-200 dark:border-zinc-800" />

						{isAlertOpen && (
							<Alert
								title="Become a creator"
								subtitle="Start sharing projects on Sharep by applying to become a creator, and start posting!"
								onHandleClose={setIsAlertOpen}
							>
								Coming soon {/* Become now */}
							</Alert>
						)}

						<Card className="lg:h-full" noPadding>
							<Loading loading={loading}>
								{creators.length ? (
									creators.map(({ name, username, is_verified: isVerified }) => (
										<CreatorCard
											key={username}
											name={name}
											username={username}
											isVerified={isVerified}
										/>
									))
								) : (
									<NoCreatorFound />
								)}
							</Loading>
						</Card>
					</div>

					<FeaturedUsersCard />
				</div>
			</Container>
		</>
	);
}
