'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '@/components/container';
import { Heading } from '@/components/ui/typography/heading';
import { Text } from '@/components/ui/typography/text';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';
import { z } from 'zod';
import { Button } from '../ui/button';
import { LinkButton } from '../ui/link-button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { PasswordInput } from '../ui/password-input';
import { useRouter } from 'next/navigation';

const signUpSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters long'),
	username: z
		.string()
		.min(1, 'This field is required')
		.max(15, 'Username must be at maximum 15 characters long'),
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export function SignUpForm() {
	const router = useRouter();

	const form = useForm<SignUpSchema>({
		defaultValues: {
			name: '',
			username: '',
			email: '',
			password: '',
		},
		resolver: zodResolver(signUpSchema),
	});

	const {
		handleSubmit,
		control,
		formState: { errors, isDirty, isValid, isSubmitting },
	} = form;

	async function handleSignUp(values: SignUpSchema) {
		const { name, username, email, password } = values;

		try {
			const res = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, username, email, password }),
			});

			if (res.ok) {
				await signIn('credentials', {
					email,
					password,
					redirect: false,
				});

				router.refresh();
			}
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<Container className="max-w-xl">
			<Card>
				<CardContent>
					<CardHeader className="space-y-8 px-0">
						<Heading size="3xl" transform="italic">
							Sign up.
						</Heading>

						<button
							type="button"
							className="flex items-center justify-center gap-2 w-full bg-zinc-200 hover:bg-zinc-200/90 dark:bg-zinc-800 dark:hover:bg-zinc-800/90 p-2 rounded-md font-medium hover:text-black dark:hover:text-white text-sm transition-colors ease-out"
							onClick={() => signIn('github')}
						>
							<FaGithub size={18} /> Continue with Github
						</button>
					</CardHeader>

					<div className="space-y-8">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t" />
							</div>

							<div className="relative flex justify-center text-sm">
								<Text as="span" size="sm" className="px-2 bg-card">
									or
								</Text>
							</div>
						</div>

						<Form {...form}>
							<form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
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
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input type="email" placeholder="Email address..." {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<PasswordInput placeholder="Password..." {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex items-center justify-between">
									<LinkButton href="/auth/signin" variant="link" className="px-0">
										Already have an account? Sign in
									</LinkButton>

									<Button isLoading={isSubmitting} disabled={isSubmitting || !isDirty || !isValid}>
										Sign Up
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</CardContent>
			</Card>
		</Container>
	);
}
