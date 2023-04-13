import { CreatorBanner } from '@/components/Cards/Creators/CreatorBanner';
import { CreatorCard } from '@/components/Cards/Creators/CreatorCard';
import { NoCreatorFound } from '@/components/Cards/Creators/NoCreatorFound';
import { ExploreMenu } from '@/components/ExploreMenu';
import { DefaultHeader } from '@/components/Header/DefaultHeader';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Loading } from '@/components/ui/Loading';
import { useBecomeCreator } from '@/hooks/useBecomeCreator';
import { axios } from '@/services/axios';
import { type ShortUser } from '@/shared/interfaces/ShortUser';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useQuery } from 'react-query';

export default function Creators() {
	const session = useSession();
	const { isBannerOpen, onBannerOpen } = useBecomeCreator();

	const { data: creators, isLoading } = useQuery<ShortUser[]>('creators', async () => {
		const { data } = await axios.get('/creators');

		return data;
	});

	return (
		<>
			<Head>
				<title>Creators | Sharep</title>
			</Head>

			<Container>
				<div className="lg:grid grid-cols-7 gap-8 mt-6">
					<div className="md:col-span-4 lg:col-span-5 space-y-4">
						<DefaultHeader>Awesome creators</DefaultHeader>

						{!session.data?.user.isCreator && isBannerOpen && (
							<CreatorBanner
								title="Become a creator"
								description="Start sharing products on Sharep by applying to become a creator, and start posting!"
								onHandleClose={onBannerOpen}
							/>
						)}

						<Card className="lg:h-full" noPadding>
							<Loading loading={isLoading}>
								{creators && creators.length > 0 ? (
									creators.map(({ username, image, ...rest }) => (
										<CreatorCard key={username} username={username} avatar={image} {...rest} />
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
