import passport from 'passport';

import { maxChar } from '#root/config/constants.js';

import { props, renderForm } from './render.js';

const inputs = [
	{
		label: 'Username',
		name: 'username',
		maxLength: maxChar.user.username,
		...props,
	},
	{
		label: 'Password',
		name: 'password',
		type: 'password',
		maxLength: maxChar.user.default,
		...props,
	},
];

const getLogIn = (req, res) =>
	renderForm(res, {
		title: 'Log in',
		action: '/log-in',
		errs: req.session.messages,
		inputs,
		submissionLabel: 'Log in',
	});

const logIn = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/log-in',
	failureMessage: 'Incorrect username or password',
});

export { getLogIn, logIn };
