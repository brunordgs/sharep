import { FormField } from '@/components/Form/FormField';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Buttons/Button';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Typography/Heading';
import { Text } from '@/components/ui/Typography/Text';
import { useAuth } from '@/hooks/useAuth';
import { updateUser } from '@/utils/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import * as z from 'zod';

// TODO: Should update where fields data come from before finish schema
const schema = z.object({
	username: z
		.string()
		.min(1, 'Username is required')
		.max(15, 'Username should be less than 15 characters'),
	displayName: z.string().min(1, 'Display Name is required'),
	bio: z.string().max(160, 'Bio should be less than 160 characters'),
	github: z.string().max(15, 'Github should be less than 15 characters'),
});

export default function SettingsAccount() {
	const auth = useAuth();
	const router = useRouter();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: auth?.user.username,
			displayName: auth?.user.name,
			bio: auth?.user.bio,
			github: auth?.user.username,
		},
		resolver: zodResolver(schema),
	});

	const hasError = Object.entries(errors).length;

	useEffect(() => {
		// TODO: Improve no auth validation
		if (!auth?.session) {
			router.push('/');
			return;
		}
	}, [auth]);

	if (!auth) return;

	return (
		<>
			<Head>
				<title>Your account | sharep</title>
			</Head>

			<Container className="my-6">
				<main className="grid grid-cols-1 lg:grid-cols-4">
					<div className="flex items-start gap-4 mb-4 lg:mb-0">
						<Avatar src={auth.user.image} size="sm" />

						<div>
							<Text weight="bold">{auth.user.name}</Text>
							<Text size="xs">@{auth.user.username}</Text>
						</div>
					</div>

					<Card className="col-span-3">
						<header>
							<Heading as="h2" transform="italic" size="sm">
								Profile settings
							</Heading>

							<Text size="sm" className="text-zinc-400">
								Change identifying details for you account
							</Text>
						</header>

						<form
							onSubmit={handleSubmit(
								async (data) =>
									await updateUser({
										name: data.displayName as string,
										username: data.username as string,
										bio: data.bio,
									}),
							)}
						>
							<div className="mt-8 space-y-6">
								<FormField
									name="username"
									label="Username"
									inputAddon="sharep.com/@"
									placeholder="Your username..."
									register={register}
									error={errors.username?.message}
								/>

								<FormField
									name="displayName"
									label="Display Name"
									placeholder="Your display name..."
									register={register}
									error={errors.displayName?.message}
								/>

								<FormField
									as="textarea"
									name="bio"
									label="Bio"
									rows={4}
									helperText="Write a few sentences about yourself."
									register={register}
									error={errors.bio?.message}
								/>

								<div className="grid sm:grid-cols-2 gap-4 mt-4">
									<FormField
										name="github"
										label="Github"
										inputAddon={<FaGithub />}
										placeholder="Your Github..."
										register={register}
										error={errors.github?.message}
									/>

									<FormField
										name="twitter"
										label="Twitter"
										inputAddon={<FaTwitter />}
										placeholder="Your Twitter..."
										register={register}
										error={''}
									/>
								</div>
							</div>

							<div className="flex justify-end mt-6">
								<Button type="submit">
									{!hasError ? 'Update' : 'Failed to save profile. Try again.'}
								</Button>
							</div>
						</form>
					</Card>
				</main>
			</Container>
		</>
	);
}
