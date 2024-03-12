import { FastifyReply, FastifyRequest } from 'fastify';
import { createUser } from './user.service';
import { CreateUserInput } from './user.schema';

export async function registerUserHandler(
	req: FastifyRequest<{ Body: CreateUserInput }>,
	reply: FastifyReply,
) {
	try {
		const user = await createUser(req.body);

		return reply.code(201).send(user);
	} catch (e) {
		console.log(e);
		reply.code(500).send(e);
	}
}
