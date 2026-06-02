import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';

import { SESSION_SECRET } from '#root/config.js';

import { pool } from './pg.js';

const pgSession = connectPgSimple(session);

export const expressSession = session({
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 90, // 3 months
	},
	resave: false,
	saveUninitialized: false,
	secret: SESSION_SECRET,
	store: new pgSession({
		createTableIfMissing: true,
		pool,
	}),
});
