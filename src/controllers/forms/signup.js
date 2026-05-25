import vine from '@vinejs/vine';
import { hash } from 'bcryptjs';

import * as db from '#root/db/db.js';

import { props, renderForm, userSchema } from './shared.js';

const schema = vine.object({
	fullName: vine.string().trim().alpha({ allowSpaces: true }).maxLength(100),
	...userSchema,
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

const renderSignup = (res, errs) =>
	renderForm(res, {
		title: 'Sign up',
		action: '/sign-up',
		errs,
		inputs,
		submissionLabel: 'Sign up',
	});

const getSignup = (req, res) => renderSignup(res);

const postSignup = async (req, res) => {
	try {
		const validatedData = await vine.validate({ schema, data: req.body });
		const { fullName, username, password } = validatedData;
		const hashedPassword = await hash(password, 10);

		await db.createUser(fullName, username, hashedPassword);

		res.redirect('/');
	} catch (err) {
		return renderSignup(res, err);
	}
};

export { getSignup, postSignup };
