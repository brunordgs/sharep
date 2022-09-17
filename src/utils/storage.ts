export function getStorageValue<T>(key: string, defaultValue: any) {
	const saved = global.window?.localStorage.getItem(key) as unknown as T;

	return saved || defaultValue;
}
