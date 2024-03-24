import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { createUser, findUserByEmail, findUserByUsername, findUsers } from './user.service';
import { CreateUserInput, LoginInput } from './user.schema';
import { verifyPassword } from '../../utils/hash';
import { server } from '../..';

export async function registerUserHandler(
	req: FastifyRequest<{ Body: CreateUserInput }>,
	reply: FastifyReply,
) {
	try {
		const user = await createUser(req.body);

		return reply.code(201).send(user);
	} catch (e) {
		const error = e as FastifyError;

		if (error.code === 'P2002') {
			return reply.code(409).send({ message: 'Email already exists' });
		}

		return reply.code(500).send({ message: 'Internal server error' });
	}
}

export async function loginHandler(req: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
	const { email, password } = req.body;

	const user = await findUserByEmail(email);

	if (!user) {
		return reply.code(401).send({ message: 'Invalid email or password' });
	}

	const passwordMatch = verifyPassword({
		password,
		salt: user.salt as string,
		hash: user.password as string,
	});

	if (passwordMatch) {
		const { password, salt, ...rest } = user;

		return { accessToken: server.jwt.sign(rest) };
	}

	return reply.code(401).send({ message: 'Invalid email or password' });
}

export async function findUserByUsernameHandler(
	req: FastifyRequest<{ Params: { username: string } }>,
) {
	return await findUserByUsername(req.params.username);
}

export async function findUsersHandler() {
	return await findUsers();
}
