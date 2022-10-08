import { FeaturedUsersCard } from './Cards/Users/FeaturedUsersCard';
import { Footer } from './Footer';

export function ExploreMenu() {
	return (
		<div className="space-y-4">
			<FeaturedUsersCard />
			<Footer />
		</div>
	);
}
