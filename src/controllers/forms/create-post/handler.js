import { matchedData, validationResult } from 'express-validator';

import { renderForm } from '#root/controllers/forms/form.js';
import * as model from '#root/models/model.js';

import { validations } from './validations.js';

const fields = {
	inputs: [
		{
			label: 'Title',
			name: 'title',
			maxLength: 50,
			isRequired: true,
		},
	],
	hasTextarea: true,
	textarea: {
		label: 'Content',
		name: 'content',
		maxLength: 500,
		isRequired: true,
	},
};

const renderCreatePost = (res, errs) => {
	renderForm(res, {
		title: 'Create post',
		action: '/create-post',
		errs,
		...fields,
		submissionLabel: 'Post',
	});
};

const getCreatePost = (_req, res) => renderCreatePost(res);

const createPost = [
	validations,
	async (req, res) => {
		const errs = validationResult(req);
		if (!errs.isEmpty()) return renderCreatePost(res, errs.array());

		const { title, content } = matchedData(req);

		await model.createPost(req.user.id, title, content);

		res.redirect('/');
	},
];

const deletePost = async (req, res) => {
	await model.deletePost(req.params.postId);
	res.redirect('/');
};

export { createPost, deletePost, getCreatePost };
