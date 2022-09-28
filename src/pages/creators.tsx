import { CreatorCard } from '@/components/Cards/Creators/CreatorCard';
import { NoCreatorFound } from '@/components/Cards/Creators/NoCreatorFound';
import { RecentUsersCard } from '@/components/Cards/Users/RecentUsersCard';
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
				<Heading transform="italic" size="lg" className="flex items-end gap-2">
					Awesome creators
				</Heading>

				<div className="grid grid-cols-1 lg:grid-cols-6 grid-rows-2 gap-8 mt-6 h-[112px] lg:h-[496px]">
					<Card className="lg:col-span-4 row-span-2" noPadding>
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

					<RecentUsersCard />
				</div>
			</Container>
		</>
	);
}
