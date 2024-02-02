export function getStorageValue<T>(key: string, defaultValue: any) {
	const saved = localStorage.getItem(key) as unknown as T;

	return saved || defaultValue;
}

export function setStorageValue(key: string, value: any) {
	localStorage.setItem(key, value);
}
