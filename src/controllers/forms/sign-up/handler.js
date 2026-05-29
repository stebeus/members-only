import { hash } from 'bcryptjs';
import { matchedData, validationResult } from 'express-validator';

import { maxChar } from '#root/config/constants.js';
import { props, renderForm } from '#root/controllers/forms/render.js';
import * as userModel from '#root/models/users.js';

import { validations } from './validations.js';

const inputs = [
	{
		label: 'Full name',
		name: 'fullName',
		placeholder: 'John Doe',
		maxLength: maxChar.user.default,
		...props,
	},
	{
		label: 'Username',
		name: 'username',
		placeholder: 'john_doe123',
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
	{
		label: 'Confirm password',
		name: 'passwordConfirmation',
		type: 'password',
		maxLength: maxChar.user.default,
		...props,
	},
];

const render = (res, errs) =>
	renderForm(res, {
		title: 'Sign up',
		action: '/sign-up',
		errs,
		inputs,
		submissionLabel: 'Sign up',
	});

const getSignUp = (_req, res) => render(res);

const signUp = [
	validations,
	async (req, res) => {
		const errs = validationResult(req);
		if (!errs.isEmpty()) return render(res, errs.array());

		const { fullName, username, password } = matchedData(req);
		const hashedPassword = await hash(password, 10);

		await userModel.createUser(fullName, username, hashedPassword);

		res.redirect('/log-in');
	},
];

export { getSignUp, signUp };
