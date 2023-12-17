import { useLocalStorage } from '@/hooks/useLocalStorage';
import { type Children } from '@/shared/interfaces/Children';
import { createContext, useEffect, useState } from 'react';

interface BecomeCreatorContextProps {
	isBannerOpen: boolean;
	onBannerOpen(isBannerOpen: boolean): void;
}

export const BecomeCreatorContext = createContext({} as BecomeCreatorContextProps);

export function BecomeCreatorProvider({ children }: Children) {
	const [becomeCreatorDialog, setBecomeCreatorDialog] = useLocalStorage(
		'becomeCreatorDialog',
		true,
	);

	const [isComponentMounted, setIsComponentMounted] = useState(false);

	useEffect(() => setIsComponentMounted(true), []);

	// Wait for component mount to prevent hydration error
	if (!isComponentMounted) {
		return null;
	}

	return (
		<BecomeCreatorContext.Provider
			value={{
				isBannerOpen: JSON.parse(becomeCreatorDialog),
				onBannerOpen: setBecomeCreatorDialog,
			}}
		>
			{children}
		</BecomeCreatorContext.Provider>
	);
}
