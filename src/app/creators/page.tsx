import { CreatorCard } from '@/components/Cards/Creators/CreatorCard';
import { NoCreatorFound } from '@/components/Cards/Creators/NoCreatorFound';
import { ExploreMenu } from '@/components/ExploreMenu';
import { DefaultHeader } from '@/components/Header/DefaultHeader';
import { Card } from '@ui/Card';
import { Container } from '@ui/Container';
import { getServerSession } from 'next-auth';
import { Metadata } from 'next';
import { authOptions } from '../api/auth/[...nextauth]/auth';
import { ShortUser } from '@/shared/interfaces/ShortUser';

export const metadata: Metadata = {
	title: 'Creators',
};

export default async function Creators() {
	const session = getServerSession(authOptions);

	async function listCreators(): Promise<ShortUser[]> {
		const res = await fetch('http://localhost:3000/api/creators');
		const data = res.json();

		if (!res.ok) {
			throw new Error('Failed to load creators');
		}

		return data;
	}

	const creators = await listCreators();

	return (
		<Container>
			<div className="lg:grid grid-cols-7 gap-8 mt-6">
				<div className="md:col-span-4 lg:col-span-5 space-y-4">
					<DefaultHeader>Awesome creators</DefaultHeader>

					{/* {!session.data?.user.isCreator && isBannerOpen && (
							<CreatorBanner
								title="Become a creator"
								description="Start sharing projects on Sharep by applying to become a creator, and start posting!"
								onHandleClose={onBannerOpen}
							/>
						)} */}

					<Card className="lg:h-full" noPadding>
						{/* <Loading loading={isLoading}> */}
						{creators && creators.length > 0 ? (
							creators.map(({ username, image, ...rest }) => (
								<CreatorCard key={username} username={username} avatar={image} {...rest} />
							))
						) : (
							<NoCreatorFound />
						)}
						{/* </Loading> */}
					</Card>
				</div>

				<div className="hidden lg:block lg:col-span-2">
					<ExploreMenu />
				</div>
			</div>
		</Container>
	);
}
