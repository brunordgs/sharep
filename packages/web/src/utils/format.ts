export function formatDate(date: string) {
	return new Intl.DateTimeFormat('en-US', {
		dateStyle: 'medium',
	}).format(new Date(date));
}

export const getFallbackInitials = (name: string | null) => {
	const splitName = name?.trim().split(/\s+/);

	const extractInitial = (word: string) => word.charAt(0).toUpperCase();
	return splitName?.slice(0, 2).map(extractInitial).join('');
};
