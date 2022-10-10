import { FormField } from '@/components/Form/FormField';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Buttons/Button';
import { LinkButton } from '@/components/ui/Buttons/LinkButton';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Typography/Heading';
import { signUp } from '@/utils/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
	name: z.string().min(3, 'Name should contain at least 3 characters'),
	username: z.string().min(1, 'This field is required'),
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password should contain at least 6 characters'),
});

type SignupForm = z.infer<typeof schema>;

export default function Signup() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<SignupForm>({
		defaultValues: {
			name: '',
			username: '',
			email: '',
			password: '',
		},
		resolver: zodResolver(schema),
	});

	return (
		<>
			<Head>
				<title>Sign up | sharep</title>
			</Head>

			<Container className="flex justify-center md:my-20">
				<form
					onSubmit={handleSubmit(async (values) => signUp(values))}
					className="w-full max-w-md space-y-8"
				>
					<Heading size="3xl" transform="italic">
						Sign up.
					</Heading>

					<Alert
						color="warning"
						title="Beta Preview Warning"
						description="This site is only for demonstration purposes. All data created or uploaded will be lost."
					/>

					<div className="space-y-4">
						<FormField
							color="secondary"
							name="name"
							label="Name"
							placeholder="Name..."
							register={register}
							error={errors.name?.message}
						/>

						<FormField
							color="secondary"
							name="username"
							label="Username"
							placeholder="Username..."
							register={register}
							error={errors.username?.message}
						/>

						<FormField
							color="secondary"
							name="email"
							label="Email"
							placeholder="Email address..."
							register={register}
							error={errors.email?.message}
						/>

						<FormField
							color="secondary"
							name="password"
							type="password"
							label="Password"
							placeholder="Password..."
							register={register}
							error={errors.password?.message}
						/>
					</div>

					<div className="flex items-center justify-between">
						<LinkButton
							href="/auth/signin"
							color="unstyled"
							className="inline-flex font-medium text-base text-rose-500 hover:text-rose-600 dark:hover:text-rose-400"
						>
							Have an account? Sign in
						</LinkButton>
						<Button type="submit">Sign Up</Button>
					</div>
				</form>
			</Container>
		</>
	);
}
