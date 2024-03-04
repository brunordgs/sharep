'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '@/components/container';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Heading } from '../ui/typography/heading';
import { FaGithub } from 'react-icons/fa';
import { Text } from '../ui/typography/text';
import { Card, CardContent, CardHeader } from '../ui/card';
import { LinkButton } from '../ui/link-button';
import { Button } from '../ui/button';
import { PasswordInput } from '../ui/password-input';

const signInSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type SignInSchema = z.infer<typeof signInSchema>;

export function SignInForm() {
	const router = useRouter();

	const form = useForm<SignInSchema>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(signInSchema),
	});

	const {
		handleSubmit,
		control,
		setError,
		formState: { errors, isDirty, isValid, isSubmitting },
	} = form;

	async function handleSignIn(values: SignInSchema) {
		const { email, password } = values;

		try {
			const res = await signIn('credentials', {
				email,
				password,
				redirect: false,
			});

			if (res?.status === 401) {
				setError('email', { message: 'Invalid email address or password' });
				return;
			}

			router.refresh();
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<Container className="max-w-xl">
			<Card>
				<CardContent>
					<CardHeader className="space-y-8 px-0">
						<Heading size="3xl" transform="italic">
							Sign in.
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
							<form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
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
									<LinkButton href="/auth/signup" variant="link" className="px-0">
										Need an account? Sign up
									</LinkButton>

									<Button
										isLoading={isSubmitting}
										disabled={isSubmitting || !isDirty || !isValid || 'email' in errors}
									>
										Sign In
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
