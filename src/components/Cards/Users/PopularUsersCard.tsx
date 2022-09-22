import { Loading } from '@/components/ui/Loading';
import { ShortUser } from '@/shared/interfaces/ShortUser';
import { supabase } from '@/utils/supabaseClient';
import { useEffect, useState } from 'react';
import { Footer } from '../../Footer';
import { Card } from '../../ui/Card';
import { Heading } from '../../ui/Typography/Heading';
import { PopularUserCard } from './PopularUserCard';

export function PopularUsersCard() {
	const [users, setUsers] = useState<ShortUser[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function initializeAsync() {
			const res = await supabase.from('users').select('*');

			if (res.data) {
				setUsers(res.data);
			}
		}

		initializeAsync();
		setLoading(false);
	}, []);

	return (
		<div className="hidden lg:block col-span-2">
			<Card className="mb-2 py-6" noPadding>
				<aside>
					<Loading loading={loading}>
					<Heading as="h2" transform="italic" className="text-xl mb-4 px-6">
						Popular users
					</Heading>

					{users.map(({ name, username }) => (
						<PopularUserCard key={username} name={name} username={username} />
					))}
					</Loading>
				</aside>
			</Card>

			<Footer />
		</div>
	);
}
