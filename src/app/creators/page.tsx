import { CreatorCard } from '@/components/cards/Creators/CreatorCard';
import { ExploreMenu } from '@/components/explore-menu';
import { NoDataFound } from '@/components/no-data-found';
import { ShortUser } from '@/shared/interfaces/ShortUser';
import { Card } from '@/components/ui/card';
import { Container } from '@ui/Container';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/auth';
import { Heading } from '@/components/ui/Typography/Heading';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { BecomeCreatorBanner } from '@/components/become-creator-banner';

export const metadata: Metadata = {
	title: 'Creators',
};

export default async function Creators() {
	const session = await getServerSession(authOptions);

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
					<div className="flex item-start lg:items-center justify-between flex-col md:flex-row gap-4">
						<Heading transform="italic" size="lg" className="flex items-end gap-2">
							Awesome creators
						</Heading>

						<Select>
							<SelectTrigger className="w-full md:w-56">
								<SelectValue placeholder="Latest" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="latest">Latest</SelectItem>
								<SelectItem value="all">All</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="border-b border-zinc-200 dark:border-zinc-800" />

					{/* {!session.data?.user.isCreator && isBannerOpen && ( */}
					{!session?.user.isCreator && <BecomeCreatorBanner />}

					<Card className="lg:h-full">
						{creators && creators.length > 0 ? (
							creators.map(({ username, image, ...rest }) => (
								<CreatorCard key={username} username={username} avatar={image} {...rest} />
							))
						) : (
							<NoDataFound title="No creators" description="There is no registered creator." />
						)}
					</Card>
				</div>

				<div className="hidden lg:block lg:col-span-2">
					<ExploreMenu />
				</div>
			</div>
		</Container>
	);
}
