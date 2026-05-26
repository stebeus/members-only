import { compare } from 'bcryptjs';
import passport from 'passport';
import { Strategy } from 'passport-local';

import * as model from '#root/models/model.js';

const verifyLocally = async (username, password, done) => {
	try {
		const user = await model.getUserByUsername(username);

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

passport.use(new Strategy(verifyLocally));

passport.serializeUser(({ id }, done) => done(null, id));

passport.deserializeUser(async (id, done) => {
	try {
		const user = await model.getUserById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});
