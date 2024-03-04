import { Loader } from 'lucide-react';

export function Spinner() {
	return (
		<div className="flex justify-center">
			<Loader className="animate-spin" />
		</div>
	);
}
