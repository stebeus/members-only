import vine from '@vinejs/vine';

import { props, userSchema } from './shared.js';

const schema = vine.object(userSchema);

const loginInputs = [
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
