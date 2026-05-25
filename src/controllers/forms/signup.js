import vine from '@vinejs/vine';

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
