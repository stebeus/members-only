import { body } from 'express-validator';

const membershipCodeValidation = body('secretCode')
	.equals('The Odin Project')
	.withMessage('Incorrect secret code');

const validations = [membershipCodeValidation];

export { validations };
