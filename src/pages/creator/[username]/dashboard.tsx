import { Container } from '@/components/ui/Container';
import Head from 'next/head';

export default function Dashboard() {
	return (
		<>
			<Head>
				<title>Dashboard | sharep</title>
			</Head>

			<Container>This is the dashboard content.</Container>
		</>
	);
}
