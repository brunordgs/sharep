import { toast as toastify, type TypeOptions } from 'react-toastify';

export function toast(text: string, { type }: { type: TypeOptions }) {
	const contextClass = {
		success: '!bg-teal-500',
		error: '!bg-rose-700 !dark:bg-rose-900',
	};

	return toastify(text, {
		type,
		progressClassName: contextClass[type as keyof typeof contextClass],
	});
}
