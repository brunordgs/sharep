import { Heading } from '@ui/Typography/Heading';
import { Text } from '@ui/Typography/Text';
import Head from 'next/head';

export default function Custom500() {
	return (
		<>
			<Head>
				<title>Something is wrong | sharep</title>
			</Head>

			<main className="flex flex-col justify-center text-center my-10">
				<div className="mb-8">
					<Heading size="xl" transform="italic" className="md:text-5xl lg:text-7xl">
						500.
					</Heading>
					<Heading as="h2" size="sm" transform="italic" className="md:text-xl lg:text-3xl">
						Oops! Something is wrong
					</Heading>
				</div>

				<Text size="sm" className="md:text-base">
					We're having some issues at the moment. Please try again.
				</Text>
			</main>
		</>
	);
}
