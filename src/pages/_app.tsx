import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Header/Navbar';
import { BecomeCreatorProvider } from '@/contexts/BecomeCreatorContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import '@/styles/globals.css';
import ProgressBar from '@badrap/bar-of-progress';
import clsx from 'clsx';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';

const progress = new ProgressBar({
	size: 4,
	color: '#f43f5e',
	className: 'z-50',
	delay: 100,
});

const TOAST_COLORS_BG = {
	success: 'bg-teal-500',
	error: 'bg-rose-500',
	info: 'bg-sky-500',
	warning: 'bg-amber-400',
	// default: 'bg-indigo-600',
	// dark: 'bg-white-600',
};

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
				theme="dark"
				transition={Flip}
				position="bottom-center"
				toastClassName={({ type }: any) =>
					TOAST_COLORS_BG[(type as keyof typeof TOAST_COLORS_BG) ?? 'default'] +
					' relative flex p-2 rounded-md justify-between overflow-hidden cursor-pointer mt-4'
				}
				progressClassName="!bg-transparent"
				bodyClassName="text-sm text-white"
			/>
		</SessionProvider>
	);
}
