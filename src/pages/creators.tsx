import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Typography/Heading';
import { PopularUsersCard } from '@/components/Cards/Users/PopularUsersCard';
import { CreatorCard } from '@/components/Cards/Creators/CreatorCard';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { Loading } from '@/components/ui/Loading';
import { ShortUser } from '@/shared/interfaces/ShortUser';

export default function Creators() {
	const [creators, setCreators] = useState<ShortUser[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function initializeAsync() {
			const res = await supabase.from('users').select('*').eq('is_creator', true);

			if (res.data) {
				setCreators(res.data);
			}
		}

		initializeAsync();
		setLoading(false);
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

				<div className="grid grid-cols-1 lg:grid-cols-6 grid-rows-2 gap-8 mt-6">
					<Card className="lg:col-span-4 row-span-2" noPadding>
						<Loading loading={loading} className="flex justify-center items-center h-full">
							{creators.map(({ name, username }) => (
								<CreatorCard key={username} name={name} username={username} />
							))}
						</Loading>
					</Card>

					<PopularUsersCard />
				</div>
			</Container>
		</>
	);
}
