import passport from 'passport';

import { logger } from '#root/lib/pino.js';

import { props, renderForm } from './shared.js';

import '#root/lib/auth.js';

const inputs = [
	{
		label: 'Username',
		name: 'username',
		maxLength: 25,
		...props,
	},
	{
		label: 'Password',
		name: 'password',
		type: 'password',
		...props,
	},
];

const renderLogIn = (res, errs) => {
	logger.debug(errs);

	renderForm(res, {
		title: 'Log in',
		action: '/log-in',
		errs,
		inputs,
		submissionLabel: 'Log in',
	});
};

const getLogIn = (req, res) => renderLogIn(res, req.session.messages);

const logInAuth = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/log-in',
	failureMessage: 'Incorrect username or password',
});

export { getLogIn, logInAuth };
