import { body } from 'express-validator';

const isSecretCode = (value) =>
	value === 'The Odin Project' || value === 'Los Angeles: Critical Mass';

const secretCodeValidation = body('secretCode')
	.custom(isSecretCode)
	.withMessage('Incorrect secret code');

const validations = [secretCodeValidation];

export { validations };
