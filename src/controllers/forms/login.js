import vine from '@vinejs/vine';

import { props, renderForm, userSchema } from './shared.js';

const schema = vine.object(userSchema);

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

const renderLogin = (res, errs) =>
	renderForm(res, {
		title: 'Log in',
		action: '/log-up',
		errs,
		inputs,
		submissionLabel: 'Log in',
	});

const getLogin = (req, res) => renderLogin(res);

export { getLogin };
