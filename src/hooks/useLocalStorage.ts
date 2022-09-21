import { useEffect, useState } from 'react';
import { getStorageValue } from '../utils/storage';

export function useLocalStorage<T>(key: string, defaultValue: any) {
	const [value, setValue] = useState(() => getStorageValue<T>(key, defaultValue));

	useEffect(() => {
		localStorage.setItem(key, value);
	}, [key, value]);

	return [value, setValue];
}