import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { AccountProfileForm } from '@/components/forms/account-profile-form';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getServerSession } from 'next-auth';

export default async function AccountProfile() {
	const session = await getServerSession(authOptions);

	return (
		<CardContent>
			<CardHeader className="px-2">
				<div>
					<CardTitle className="text-xl font-bold italic">Profile settings</CardTitle>
					<CardDescription>Change identifying details for you account</CardDescription>
				</div>
			</CardHeader>

			<AccountProfileForm user={session.user} />
		</CardContent>
	);
}
