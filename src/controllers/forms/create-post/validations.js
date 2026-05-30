import { createLengthChain } from '#root/controllers/forms/validations.js';

const title = createLengthChain({
	fieldName: 'title',
	max: 50,
});

const content = createLengthChain({
	fieldName: 'content',
	max: 500,
});

export const validations = [title, content];
