import { compare } from 'bcryptjs';
import passport from 'passport';
import { Strategy } from 'passport-local';

import { getUserById, getUserByUsername } from '#root/db/db.js';

const authenticate = async (username, password, done) => {
	try {
		const user = await getUserByUsername(username);

		if (user == null) {
			return done(null, false, { message: 'Incorrect username' });
		}

		const isMatch = await compare(password, user.password);

		if (!isMatch) {
			return done(null, false, { message: 'Incorrect password' });
		}

		return done(null, user);
	} catch (err) {
		return done(err);
	}
};

passport.use(new Strategy(authenticate));

passport.serializeUser(({ id }, done) => done(null, id));

passport.deserializeUser(async (id, done) => {
	try {
		const user = await getUserById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});
