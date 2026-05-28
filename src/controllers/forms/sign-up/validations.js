import { body } from 'express-validator';

const createNameValidation = (
	body,
	{ fieldName, fieldLabel, ignore, maxLength },
) =>
	body(fieldName)
		.trim()
		.notEmpty()
		.withMessage(`${fieldLabel} must not be empty`)
		.isAlphanumeric('en-US', { ignore })
		.withMessage(`${fieldLabel} must only contain alphanumeric characters`)
		.isLength({ max: maxLength })
		.withMessage(`${fieldLabel} must not exceed ${maxLength}`);

const fullNameValidation = createNameValidation(body, {
	fieldName: 'fullName',
	fieldLabel: 'Full name',
	ignore: ' ',
	maxLength: 100,
});

const usernameValidation = createNameValidation(body, {
	fieldName: 'username',
	fieldLabel: 'Username',
	ignore: '_',
	maxLength: 100,
});

const passwordValidation = body('password')
	.trim()
	.notEmpty()
	.withMessage('Password must not be empty');

const isEveryPasswordEqual = (value, { req }) => value === req.body.password;

const confirmPasswordValidation = body('confirmPassword')
	.custom(isEveryPasswordEqual)
	.withMessage('Passwords must match');

export const validations = [
	fullNameValidation,
	usernameValidation,
	passwordValidation,
	confirmPasswordValidation,
];
