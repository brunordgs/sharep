export function getStorageValue<T>(key: string, defaultValue: any) {
	if (typeof window === 'undefined') return;

	const saved = localStorage.getItem(key) as unknown as T;

	return saved || defaultValue;
}
