import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Header/Navbar';
import { BecomeCreatorProvider } from '@/contexts/BecomeCreatorContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { queryClient } from '@/lib/react-query';
import '@/styles/globals.css';
import ProgressBar from '@badrap/bar-of-progress';
import clsx from 'clsx';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { QueryClientProvider } from 'react-query';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const progress = new ProgressBar({
	size: 4,
	color: '#f43f5e',
	className: 'z-50',
	delay: 100,
});

export default function App({ Component, pageProps: { session, ...pageProps }, router }: AppProps) {
	const excludeRoutes = ['/', '/creators'];

	useEffect(() => {
		router.events.on('routeChangeStart', progress.start);
		router.events.on('routeChangeComplete', progress.finish);
		router.events.on('routeChangeError', progress.finish);

		return () => {
			router.events.off('routeChangeStart', progress.start);
			router.events.off('routeChangeComplete', progress.finish);
			router.events.off('routeChangeError', progress.finish);
		};
	}, [router]);

	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider session={session}>
				<ThemeProvider>
					<BecomeCreatorProvider>
						<Navbar />
						<Component {...pageProps} />

						<div className={clsx({ 'lg:hidden': excludeRoutes.includes(router.pathname) }, 'mb-6')}>
							<Footer />
						</div>
					</BecomeCreatorProvider>
				</ThemeProvider>

				<ToastContainer
					theme="light"
					transition={Flip}
					position="bottom-center"
					toastClassName="relative flex p-2 rounded-md justify-between overflow-hidden cursor-pointer mt-4 bg-zinc-50 dark:bg-zinc-900"
					bodyClassName="text-sm text-zinc-600 dark:text-zinc-200"
				/>
			</SessionProvider>
		</QueryClientProvider>
	);
}
