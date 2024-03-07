import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Children } from '@/shared/interfaces/Children';
import '@/styles/globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { BackgroundGradient } from '@/components/background-gradient';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/auth';

export const metadata: Metadata = {
	title: {
		template: '%s | Sharep',
		default: 'Sharep',
	},
};

const inter = Inter({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-inter',
});

export default async function RootLayout({ children }: Children) {
	const session = await getServerSession(authOptions);

	return (
		<html lang="en" className={inter.className} suppressHydrationWarning>
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			<link rel="manifest" href="/site.webmanifest" />
			<meta name="msapplication-config" content="/browserconfig.xml" />
			<meta name="msapplication-TileColor" content="#ffffff" />
			<meta name="theme-color" content="#ffffff" />

			<body>
				<Providers>
					<BackgroundGradient>
						<Navbar />
						{children}
						<Footer />
					</BackgroundGradient>
				</Providers>
			</body>
		</html>
	);
}
