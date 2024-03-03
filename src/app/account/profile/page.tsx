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

			{/* <Form onSubmit={handleSubmit(handleUpdateProfile)} methods={methods}>
				<div className="mt-8 space-y-6">
					<FormField
						name="username"
						label="Username"
						inputAddon="@"
						placeholder="Your username..."
						error={errors.username?.message}
					/>

					<FormField
						name="displayName"
						label="Display Name"
						placeholder="Your display name..."
						error={errors.displayName?.message}
					/>

					<FormField
						as="textarea"
						name="bio"
						label="Bio"
						rows={4}
						helperText="Write a few sentences about yourself."
						error={errors.bio?.message}
					/>

					<div className="grid sm:grid-cols-2 gap-4">
						<FormField
							name="website"
							label="Website"
							inputAddon={<Link weight="bold" />}
							placeholder="example.com"
							error={errors.website?.message}
						/>

						<FormField
							name="github"
							label="Github"
							inputAddon={<FaGithub />}
							placeholder="brunordgs"
							error={errors.github?.message}
						/>

						<FormField
							name="twitch"
							label="Twitch"
							inputAddon={<FaTwitch />}
							placeholder="brunordgs"
							error={errors.twitch?.message}
						/>

						<FormField
							name="youtube"
							label="Youtube"
							inputAddon={<FaYoutube />}
							placeholder="brunordgs"
							error={errors.youtube?.message}
						/>
					</div>
				</div>

				<div className="flex justify-end mt-6">
					{isSubmitting ? (
						<LoadingButton />
					) : isFormSubmmited ? (
						<Button color="success" className="cursor-not-allowed">
							<Check size={20} weight="bold" />
						</Button>
					) : (
						<Button type="submit" disabled={!isFormEditted}>
							{isFormValid ? 'Update profile' : 'Failed to save profile. Try again.'}
						</Button>
					)}
				</div>
			</Form> */}
		</CardContent>
	);
}
