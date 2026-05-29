import { matchedData, validationResult } from 'express-validator';

import { maxChar } from '#root/config/constants.js';
import { renderForm } from '#root/controllers/forms/render.js';
import * as postModel from '#root/models/posts.js';

import { validations } from './validations.js';

const fields = {
	inputs: [
		{
			label: 'Title',
			name: 'title',
			maxLength: maxChar.post.title,
			isRequired: true,
		},
	],
	hasTextarea: true,
	textarea: {
		label: 'Content',
		name: 'content',
		maxLength: maxChar.post.content,
		isRequired: true,
	},
};

const render = (res, errs) =>
	renderForm(res, {
		title: 'Create post',
		action: '/create-post',
		errs,
		...fields,
		submissionLabel: 'Post',
	});

const getCreatePost = (_req, res) => render(res);

const createPost = [
	validations,
	async (req, res) => {
		const errs = validationResult(req);
		if (!errs.isEmpty()) return render(res, errs.array());

		const { title, content } = matchedData(req);

		await postModel.createPost(req.user.id, title, content);

		res.redirect('/');
	},
];

const deletePost = async (req, res) => {
	await postModel.deletePost(req.params.postId);
	res.redirect('/');
};

export { createPost, deletePost, getCreatePost };
