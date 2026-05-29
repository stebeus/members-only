import { body } from 'express-validator';

import { createLengthChain } from '#root/controllers/forms/validations.js';

const createNameChain = ({
	fieldName,
	fieldLabel = fieldName,
	charFn = 'isAlpha',
	ignore,
	min,
	max,
}) => {
	const charConstraint = charFn === 'isAlpha' ? 'alphabetic' : 'alphanumeric';

	return createLengthChain({ fieldName, fieldLabel, min, max })
		[charFn]('en-US', { ignore })
		.withMessage(
			`${fieldLabel} must contain only ${charConstraint} characters`,
		);
};

const fullName = createNameChain({
	fieldName: 'fullName',
	fieldLabel: 'full name',
	ignore: ' ',
	max: 100,
});

const username = createNameChain({
	fieldName: 'username',
	charFn: 'isAlphanumeric',
	ignore: '_',
	max: 25,
});

const password = createLengthChain({ fieldName: 'password', max: 100 });

const matchPasswords = (value, { req }) => value === req.body.password;

const passwordConfirmation = body('passwordConfirmation')
	.custom(matchPasswords)
	.withMessage('Passwords must match');

export const validations = [fullName, username, password, passwordConfirmation];
