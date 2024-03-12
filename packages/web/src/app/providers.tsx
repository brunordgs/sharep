'use client';
import { type Children } from '@/shared/interfaces/Children';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { AppProgressBar } from 'next-nprogress-bar';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useState } from 'react';

export function Providers({ children }: Children) {
	const [queryClient] = useState(new QueryClient());

	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<NextThemesProvider attribute="class">
					{children}
					<AppProgressBar
						height="4px"
						color="#e11d48"
						options={{ easing: 'ease', speed: 200, showSpinner: false }}
						shallowRouting
					/>
				</NextThemesProvider>
			</QueryClientProvider>
		</SessionProvider>
	);
}
