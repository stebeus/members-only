import session from 'express-session';

import { SESSION_SECRET } from '#root/config.js';

export const expressSession = session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
});
