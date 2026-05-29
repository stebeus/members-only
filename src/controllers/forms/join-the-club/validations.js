import { body } from 'express-validator';

import { secretCode } from '#root/config/constants.js';

const isSecretCode = (value) =>
	value === secretCode.club || value === secretCode.admin;

export const validation = body('secretCode')
	.custom(isSecretCode)
	.withMessage('Incorrect secret code');
