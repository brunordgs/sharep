'use client';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
	const router = useRouter();

	function signOut() {
		document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		router.refresh();
	}

	return (
		<button className="flex items-center gap-1.5 w-full" onClick={signOut}>
			<LogOut className="size-4" />
			Sign out
		</button>
	);
}
