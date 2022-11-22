import { Form } from '@/components/Form';
import { FormField } from '@/components/Form/FormField';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Buttons/Button';
import { LinkButton } from '@/components/ui/Buttons/LinkButton';
import { LoadingButton } from '@/components/ui/Buttons/LoadingButton';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Typography/Heading';
import { signUp } from '@/utils/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters long'),
	username: z.string().min(1, 'This field is required'),
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type SignupForm = z.infer<typeof schema>;

export default function Signup() {
	const router = useRouter();
	const methods = useForm<SignupForm>({
		defaultValues: {
			name: '',
			username: '',
			email: '',
			password: '',
		},
		resolver: zodResolver(schema),
	});

	const {
		handleSubmit,
		formState: { errors, isSubmitting },
	} = methods;

	return (
		<>
			<Head>
				<title>Sign up | sharep</title>
			</Head>

			<Container className="flex justify-center md:my-20">
				<Form
					onSubmit={handleSubmit(async (values) => {
						await signUp(values);
						router.push('/');
					})}
					className="w-full max-w-md space-y-8"
					methods={methods}
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
							error={errors.name?.message}
						/>

						<FormField
							color="secondary"
							name="username"
							label="Username"
							placeholder="Username..."
							error={errors.username?.message}
						/>

						<FormField
							color="secondary"
							name="email"
							label="Email"
							placeholder="Email address..."
							error={errors.email?.message}
						/>

						<FormField
							color="secondary"
							name="password"
							label="Password"
							placeholder="Password..."
							error={errors.password?.message}
							isPassword
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

						{isSubmitting ? <LoadingButton /> : <Button type="submit">Sign Up</Button>}
					</div>
				</Form>
			</Container>
		</>
	);
}
