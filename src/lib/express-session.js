import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';

import { SESSION_SECRET } from '#root/config.js';

import { pool } from './pg.js';

const pgSession = connectPgSimple(session);

export const expressSession = session({
	resave: false,
	saveUninitialized: false,
	secret: SESSION_SECRET,
	store: new pgSession({
		createTableIfMissing: true,
		pool,
	}),
});
