import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Header/Navbar';
import '@/styles/globals.css';
import clsx from 'clsx';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const router = useRouter();
	const excludeRoutes = ['/', '/creators'];

	return (
		<SessionProvider session={session}>
			<Navbar />
			<Component {...pageProps} />

			<div className={clsx({ 'lg:hidden': excludeRoutes.includes(router.pathname) })}>
				<Footer />
			</div>
		</SessionProvider>
	);
}
