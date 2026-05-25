import session from 'express-session';

import { SESSION_SECRET } from '#root/config.js';

export const expressSession = session({
	resave: false,
	saveUninitialized: false,
	secret: SESSION_SECRET,
});
