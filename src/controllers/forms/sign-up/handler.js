import { hash } from 'bcryptjs';
import { matchedData, validationResult } from 'express-validator';

import { props, renderForm } from '#root/controllers/forms/form.js';
import * as model from '#root/models/model.js';

import { validations } from './validations.js';

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

const signUp = [
	validations,
	async (req, res) => {
		const errs = validationResult(req);
		if (!errs.isEmpty()) return renderSignUp(res, errs.array());

		const { fullName, username, password } = matchedData(req);
		const hashedPassword = await hash(password, 10);

		await model.createUser(fullName, username, hashedPassword);

		res.redirect('/');
	},
];

export { getSignUp, signUp };
