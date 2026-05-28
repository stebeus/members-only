import { validationResult } from 'express-validator';

import { renderForm } from '#root/controllers/forms/form.js';
import * as model from '#root/models/model.js';

import { validations } from './validations.js';

const renderJoinTheClub = (res, errs) =>
	renderForm(res, {
		title: 'Join the club',
		action: '/join-the-club',
		errs,
		inputs: [{ label: 'Secret code', name: 'secretCode' }],
		submissionLabel: 'Join',
	});

const getJoinTheClub = (_req, res) => renderJoinTheClub(res);

const joinTheClub = [
	validations,
	async (req, res) => {
		const errs = validationResult(req);
		if (!errs.isEmpty()) return renderJoinTheClub(res, errs.array());

		await model.updateUserMembership(req.user.id);

		res.redirect('/');
	},
];

export { getJoinTheClub, joinTheClub };
