import { prisma } from '../../db/client';
import { hashPassword } from '../../utils/hash';
import { CreateUserInput } from './user.schema';

export async function createUser(input: CreateUserInput) {
	const { password, email, ...rest } = input;

	const { hash, salt } = hashPassword(password);

	const username = email.split('@')[0] + Math.floor(Math.random() * 1000);

	const user = await prisma.user.create({
		data: {
			...rest,
			salt,
			email,
			username, 
			password: hash,
			image:
				'https://ik.imagekit.io/sharep/profile-user-svgrepo-com%202_zVv3Gve40.svg',
		},
	});

	return user;
}
