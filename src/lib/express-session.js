import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';

import { SESSION_SECRET } from '#root/config.js';

import { sql } from './postgres.js';

const PostgresSession = connectPgSimple(session);

export const expressSession = session({
	resave: false,
	saveUninitialized: false,
	secret: SESSION_SECRET,
	store: new PostgresSession({
		pool: sql,
	}),
});
