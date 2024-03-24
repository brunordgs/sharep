export function parseJwt<T>(token: string | undefined): T | null {
	if (!token) {
		return null;
	}

	return JSON.parse(atob(token?.split('.')[1] ?? ''));
}
