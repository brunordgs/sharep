import { Footer } from './footer';
import { FeaturedUsersCard } from './featured-users-card';

export function ExploreMenu() {
	return (
		<div className="space-y-4">
			<FeaturedUsersCard />
			<Footer />
		</div>
	);
}
