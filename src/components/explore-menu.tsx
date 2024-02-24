import { Footer } from './Footer';
import { FeaturedUsersCard } from './cards/featured-users/featured-users-card';

export function ExploreMenu() {
	return (
		<div className="space-y-4">
			<FeaturedUsersCard />
			<Footer />
		</div>
	);
}
