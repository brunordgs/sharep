import { FastifyInstance } from 'fastify';
import { findUserByUsernameHandler, findUsersHandler, loginHandler, registerUserHandler } from './user.controller';
import { $ref } from './user.schema';

export async function userRoutes(server: FastifyInstance) {
	server.post(
		'/',
		{
			schema: {
				body: $ref('createUserSchema'),
				response: {
					201: $ref('createUserResponseSchema'),
				},
			},
		},
		registerUserHandler,
	);

	server.post(
		'/login',
		{
			schema: {
				body: $ref('loginSchema'),
				response: {
					200: $ref('loginResponseSchema'),
				},
			},
		},
		loginHandler,
	);

	server.get('/', findUsersHandler);
	server.get('/:username', findUserByUsernameHandler);
}
