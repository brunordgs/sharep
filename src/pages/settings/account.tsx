import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Typography/Heading';
import { Text } from '@/components/ui/Typography/Text';
import Head from 'next/head';

export default function SettingsAccount() {
	return (
		<>
			<Head>
				<title>Your account | sharep</title>
			</Head>

			<Container className="my-6">
				<Heading transform="italic" size="lg" className="flex items-end gap-2">
					Settings
				</Heading>

				<main className="mt-8">
					<section>
						<Heading as="h2" transform="italic" size="sm">
							Profile settings
						</Heading>
						<Text size="sm">Change identifying details for you account</Text>

						<div>
							
						</div>
					</section>
				</main>
			</Container>
		</>
	);
}
