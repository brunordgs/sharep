import { Loading } from '@/components/ui/Loading';
import { ShortUser } from '@/shared/interfaces/ShortUser';
import { supabase } from '@/services/supabaseClient';
import { useEffect, useState } from 'react';
import { Footer } from '../../Footer';
import { Card } from '../../ui/Card';
import { Heading } from '../../ui/Typography/Heading';
import { RecentUserCard } from './RecentUserCard';

export function RecentUsersCard() {
	const [users, setUsers] = useState<ShortUser[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function initializeAsync() {
			const res = await supabase.from('users').select();

			if (res.data) {
				setUsers(res.data);
			}

			setLoading(false);
		}

		initializeAsync();
	}, []);

	return (
		<div className="hidden lg:block col-span-2">
			<Card className="mb-2 py-6" noPadding>
				<Loading loading={loading}>
					<aside>
						<Heading as="h2" transform="italic" className="text-xl mb-4 px-6">
							Recent users
						</Heading>

						{users.map(({ name, username, is_verified: isVerified }) => (
							<RecentUserCard
								key={username}
								name={name}
								username={username}
								isVerified={isVerified}
							/>
						))}
					</aside>
				</Loading>
			</Card>

			<Footer />
		</div>
	);
}
