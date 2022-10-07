import { CreatorCard } from '@/components/Cards/Creators/CreatorCard';
import { NoCreatorFound } from '@/components/Cards/Creators/NoCreatorFound';
import { FeaturedUsersCard } from '@/components/Cards/Users/FeaturedUsersCard';
import { DefaultHeader } from '@/components/Header/DefaultHeader';
import { Alert } from '@/components/ui/Alert';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Loading } from '@/components/ui/Loading';
import { supabase } from '@/services/supabaseClient';
import { type ShortUser } from '@/shared/interfaces/ShortUser';
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

			<Container>
				<div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mt-6">
					<div className="lg:col-span-4 space-y-4">
						<DefaultHeader>Awesome creators</DefaultHeader>

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
