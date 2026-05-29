import { body } from 'express-validator';

const titleValidation = body('title')
	.notEmpty()
	.withMessage('Title must not be empty')
	.isLength({ max: 50 })
	.withMessage('Title must not exceed 50 characters');

const contentValidation = body('content')
	.notEmpty()
	.withMessage('Content must not be empty')
	.isLength({ max: 500 })
	.withMessage('Content must not exceed 500 characters');

export const validations = [titleValidation, contentValidation];
