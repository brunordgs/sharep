import { BecomeCreatorContext } from '@/contexts/BecomeCreatorContext';
import { useContext } from 'react';

export function useBecomeCreator() {
	return useContext(BecomeCreatorContext);
}
