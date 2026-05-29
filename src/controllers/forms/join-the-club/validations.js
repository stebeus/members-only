import { body } from 'express-validator';

import { ADMIN_CODE, CLUB_CODE } from '#root/config/env.js';

const isSecretCode = (value) => value === CLUB_CODE || value === ADMIN_CODE;

export const validation = body('secretCode')
	.custom(isSecretCode)
	.withMessage('Incorrect secret code');
