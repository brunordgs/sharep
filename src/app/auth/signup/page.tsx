import { SignUpForm } from '@/components/forms/signup-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sign up',
};

export default function Signup() {
	return <SignUpForm />;
}
