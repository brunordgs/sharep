export async function fetchAPI<T = Response>(input: RequestInfo | URL, init?: RequestInit) {
	const token =
		typeof document !== 'undefined' &&
		document.cookie
			.split('; ')
			.find((row) => row.startsWith('token='))
			?.split('=')[1];

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${input}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			...(token && { Authorization: `Bearer ${token}` }),
		},
		...init,
	});

	if (init?.method === 'POST') {
		return res;
	}

	const data = await res.json();

	return data as T;
}
