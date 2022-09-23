import { Heading } from '@/components/ui/Typography/Heading';
import { Text } from '@/components/ui/Typography/Text';
import Head from 'next/head';

export default function Custom404() {
	return (
		<>
			<Head>
				<title>Page not found | sharep</title>
			</Head>

			<main className="flex flex-col justify-center text-center my-10">
				<div className="mb-8">
					<Heading size="xl" transform="italic" className="md:text-5xl lg:text-7xl">
						404.
					</Heading>
					<Heading as="h2" size="sm" transform="italic" className="md:text-xl lg:text-3xl">
						Oops! Page not found
					</Heading>
				</div>

				<Text size="sm" className="md:text-base">
					We can&apos;t seem to find the page you are looking for
				</Text>
			</main>
		</>
	);
}
