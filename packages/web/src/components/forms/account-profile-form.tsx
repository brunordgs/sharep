'use client';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';

import { z } from 'zod';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const profileSchema = z.object({
	name: z.string().min(1, 'Name is required').max(50, 'Name should be less than 50 characters'),
	username: z
		.string()
		.min(1, 'Username is required')
		.max(15, 'Username should be less than 15 characters'),
	bio: z.string().max(160, 'Bio should be less than 160 characters'),
});

type ProfileForm = z.infer<typeof profileSchema>;

export interface Props {
	user: {
		name: string;
		username: string;
		bio: string;
		email: string;
	};
}

export function AccountProfileForm({ user }: Props) {
	const router = useRouter();
	const { data: session, update } = useSession();

	const form = useForm<ProfileForm>({
		defaultValues: {
			name: user.name,
			username: user.username,
			bio: user.bio,
		},
	});

	const {
		handleSubmit,
		control,
		formState: { isDirty, isValid, isSubmitSuccessful },
	} = form;

	async function handleEditProfile(values: ProfileForm) {
		await fetch('/api/users', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: values.name,
				username: values.username,
				bio: values.bio,
			}),
		});

		await update({
			...session,
			user: {
				...values,
			},
		});

		router.refresh();
	}

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(handleEditProfile)} className="space-y-4">
				<FormField
					control={control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Name..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="Username..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="bio"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bio</FormLabel>
							<FormControl>
								<Textarea placeholder="Bio..." {...field} />
							</FormControl>
							<FormDescription>Write a few sentences about yourself.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<footer className="border-t">
					<div className="pt-4 flex justify-end">
						<Button disabled={!isDirty || !isValid || isSubmitSuccessful}>Save</Button>
					</div>
				</footer>
			</form>
		</Form>
	);
}
