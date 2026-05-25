import { props } from './shared.js';

const signupInputs = [
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
];

const getSignup = async (req, res) => {};
