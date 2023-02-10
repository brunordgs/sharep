import { CreatorBanner } from '@/components/Cards/Creators/CreatorBanner';
import { CreatorCard } from '@/components/Cards/Creators/CreatorCard';
import { NoCreatorFound } from '@/components/Cards/Creators/NoCreatorFound';
import { ExploreMenu } from '@/components/ExploreMenu';
import { DefaultHeader } from '@/components/Header/DefaultHeader';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Loading } from '@/components/ui/Loading';
import { useAuth } from '@/hooks/useAuth';
import { useBecomeCreator } from '@/hooks/useBecomeCreator';
import { supabase } from '@/services/supabaseClient';
import { type ShortUser } from '@/shared/interfaces/ShortUser';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Creators() {
	const auth = useAuth();
	const [creators, setCreators] = useState<ShortUser[]>([]);
	const [loading, setLoading] = useState(true);
	const { isBannerOpen, onBannerOpen } = useBecomeCreator();

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
				<title>Creators | Sharep</title>
			</Head>

			<Container>
				<div className="lg:grid grid-cols-7 gap-8 mt-6">
					<div className="md:col-span-4 lg:col-span-5 space-y-4">
						<DefaultHeader>Awesome creators</DefaultHeader>

						{!auth?.user.isCreator && isBannerOpen && (
							<CreatorBanner
								title="Become a creator"
								description="Start sharing products on Sharep by applying to become a creator, and start posting!"
								onHandleClose={onBannerOpen}
							/>
						)}

						<Card className="lg:h-full" noPadding>
							<Loading loading={loading}>
								{creators.length ? (
									creators.map(({ name, username, is_verified, avatar_url }) => (
										<CreatorCard
											key={username}
											name={name}
											username={username}
											isVerified={is_verified}
											avatar={avatar_url}
										/>
									))
								) : (
									<NoCreatorFound />
								)}
							</Loading>
						</Card>
					</div>

					<div className="hidden lg:block lg:col-span-2">
						<ExploreMenu />
					</div>
				</div>
			</Container>
		</>
	);
}
