import vine from '@vinejs/vine';
import { hash } from 'bcryptjs';

import { logger } from '#root/lib/pino.js';
import * as model from '#root/models/model.js';

import { props, renderForm } from './shared.js';

const schema = vine.object({
	fullName: vine.string().trim().alpha({ allowSpaces: true }).maxLength(100),
	username: vine
		.string()
		.trim()
		.alphaNumeric({ allowUnderscores: true })
		.maxLength(25),
	password: vine.string().trim(),
	confirmPassword: vine.string().sameAs('password'),
});

const inputs = [
	{
		label: 'Full name',
		name: 'fullName',
		placeholder: 'John Doe',
		maxLength: 100,
		...props,
	},
	{
		label: 'Username',
		name: 'username',
		placeholder: 'john_doe123',
		maxLength: 25,
		...props,
	},
	{
		label: 'Password',
		name: 'password',
		type: 'password',
		...props,
	},
	{
		label: 'Confirm password',
		name: 'confirmPassword',
		type: 'password',
		...props,
	},
];

const renderSignUp = (res, errs) =>
	renderForm(res, {
		title: 'Sign up',
		action: '/sign-up',
		errs,
		inputs,
		submissionLabel: 'Sign up',
	});

const getSignUp = (_req, res) => renderSignUp(res);

const signUp = async (req, res) => {
	try {
		const validatedData = await vine.validate({ schema, data: req.body });
		const { fullName, username, password } = validatedData;
		const hashedPassword = await hash(password, 10);

		await model.createUser(fullName, username, hashedPassword);

		res.redirect('/');
	} catch (err) {
		logger.debug(err);
		return renderSignUp(res, err.messages);
	}
};

export { getSignUp, signUp };
