'use client';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export function LogOutButton() {
	return (
		<button
			className="flex items-center gap-1.5 w-full"
			onClick={() =>
				signOut({
					redirect: true,
					callbackUrl: '/',
				})
			}
		>
			<LogOut className="w-4 h-4" />
			Log out
		</button>
	);
}
