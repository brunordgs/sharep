import {
	AccountProfileForm,
	Props as AccountProfileFormProps,
} from '@/components/forms/account-profile-form';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { parseJwt } from '@/utils/parse';
import { cookies } from 'next/headers';

export default async function AccountProfile() {
	const session = cookies().get('token');
	const user = parseJwt(session?.value);

	return (
		<CardContent>
			<CardHeader className="px-2">
				<div>
					<CardTitle className="text-xl font-bold italic">Profile settings</CardTitle>
					<CardDescription>Change identifying details for you account</CardDescription>
				</div>
			</CardHeader>

			<AccountProfileForm user={user as AccountProfileFormProps['user']} />
		</CardContent>
	);
}
