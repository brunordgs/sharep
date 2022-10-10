import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Header/Navbar';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import '@/styles/globals.css';
import ProgressBar from '@badrap/bar-of-progress';
import clsx from 'clsx';
import type { AppProps } from 'next/app';
import { Router, useRouter } from 'next/router';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const progress = new ProgressBar({
	size: 4,
	color: '#f43f5e',
	className: 'z-50',
	delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

const TOAST_COLORS_BG = {
	success: 'bg-teal-500',
	error: 'bg-rose-500',
	info: 'bg-sky-500',
	warning: 'bg-amber-400',
	// default: 'bg-indigo-600',
	// dark: 'bg-white-600',
};

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const excludeRoutes = ['/', '/creators'];

	return (
		<AuthProvider>
			<ThemeProvider>
				<Navbar />
				<Component {...pageProps} />

				<div className={clsx({ 'lg:hidden': excludeRoutes.includes(router.pathname) }, 'mb-6')}>
					<Footer />
				</div>
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
		</AuthProvider>
	);
}
