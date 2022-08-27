import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Header/Navbar';
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	return (
		<>
			<Navbar />
			<Component {...pageProps} />
			{router.pathname !== '/' && <Footer />}
		</>
	);
}
