import { SignInForm } from '@/components/forms/signin-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sign in',
};

export default function Signin() {
	return <SignInForm />;
}
