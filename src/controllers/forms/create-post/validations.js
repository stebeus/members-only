import { maxChar } from '#root/config/constants.js';
import { createLengthChain } from '#root/controllers/forms/validations.js';

const title = createLengthChain({
	fieldName: 'title',
	max: maxChar.post.title,
});

const content = createLengthChain({
	fieldName: 'content',
	max: maxChar.post.content,
});

export const validations = [title, content];
