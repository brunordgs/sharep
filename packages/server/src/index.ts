import { fastify } from 'fastify';
import fjwt from '@fastify/jwt';
import { userRoutes } from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';
import { FastifyRequest } from 'fastify/types/request';
import { FastifyReply } from 'fastify/types/reply';
import { teamMembersRoutes } from './modules/team-members/team-members.route';
import cors from '@fastify/cors';

declare module 'fastify' {
	export interface FastifyInstance {
		authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
	}
}

export const server = fastify({
	ignoreTrailingSlash: true,
});

server.register(cors)

server.register(fjwt, {
	secret: process.env.JWT_SECRET,
});

server.decorate('authenticate', async (req: FastifyRequest, reply: FastifyReply) => {
	try {
		await req.jwtVerify();
	} catch (e) {
		return reply.code(401).send({ message: 'User unauthorized' });
	}
});

server.get('/', (req, reply) => {
	return reply.send({ status: 'ok' });
});

async function main() {
	for (const schema of userSchemas) {
		server.addSchema(schema);
	}

	server.register(userRoutes, {
		prefix: '/api/users',
	});

	server.register(teamMembersRoutes, {
		prefix: '/api/team-members',
	});

	try {
		await server.listen({ port: +process.env.PORT || 4000 });
		console.log(`Server ready at http://localhost:${process.env.PORT}`);
	} catch (e) {
		server.log.error(e);
		process.exit(1);
	}
}

main();
