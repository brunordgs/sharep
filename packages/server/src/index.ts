import { fastify } from 'fastify';
import { userRoutes } from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';

const server = fastify({
	ignoreTrailingSlash: true,
});

server.get('/', (req, reply) => {
	reply.send({ status: 'ok' });
});

async function main() {
	for (const schema of userSchemas) {
		server.addSchema(schema);
	}

	server.register(userRoutes, {
		prefix: '/api/users',
	});

	try {
		await server.listen({ port: process.env.PORT || 4000 });
		console.log(`Server ready at http://localhost:${process.env.PORT}`);
	} catch (e) {
		server.log.error(e);
		process.exit(1);
	}
}

main();
