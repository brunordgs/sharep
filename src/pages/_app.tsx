import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Header/Navbar';
import { ThemeProvider } from '@/contexts/ThemeContext';
import '@/styles/globals.css';
import ProgressBar from '@badrap/bar-of-progress';
import clsx from 'clsx';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Router, useRouter } from 'next/router';

const progress = new ProgressBar({
	size: 4,
	color: '#f43f5e',
	className: 'z-50',
	delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
	const router = useRouter();
	const excludeRoutes = ['/', '/creators'];

	return (
		<SessionProvider session={session}>
			<ThemeProvider>
				<Navbar />
				<Component {...pageProps} />

				<div className={clsx({ 'lg:hidden': excludeRoutes.includes(router.pathname) })}>
					<Footer />
				</div>
			</ThemeProvider>
		</SessionProvider>
	);
}
