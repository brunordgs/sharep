import { BecomeCreatorBanner } from '@/components/become-creator-banner';
import { Container } from '@/components/container';
import { ExploreMenu } from '@/components/explore-menu';
import { ProductsCard } from '@/components/products-card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Heading } from '@/components/ui/typography/heading';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/auth';

export default async function Home() {
	const session = await getServerSession(authOptions);

	return (
		<Container>
			<div className="lg:grid grid-cols-7 gap-8">
				<div className="md:col-span-4 lg:col-span-5 space-y-4">
					<div className="flex item-start lg:items-center justify-between flex-col md:flex-row gap-4">
						<Heading transform="italic" size="lg" className="flex items-end gap-2">
							Your next favorite thing
							<CaretDown className="animate-bounce" />
						</Heading>

						<Select>
							<SelectTrigger className="w-full md:w-56">
								<SelectValue placeholder="Featured" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="featured">Featured</SelectItem>
								<SelectItem value="latest">Latest</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="border-b border-zinc-200 dark:border-zinc-800" />

					{session && <BecomeCreatorBanner />}

					<ProductsCard />
				</div>

				<div className="hidden lg:block lg:col-span-2">
					<ExploreMenu />
				</div>
			</div>
		</Container>
	);
}
