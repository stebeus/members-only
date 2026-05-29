import { matchedData, validationResult } from 'express-validator';

import { ADMIN_CODE } from '#root/config/env.js';
import { renderForm } from '#root/controllers/forms/render.js';
import * as userModel from '#root/models/users.js';

import { validation } from './validations.js';

const render = (res, errs) =>
	renderForm(res, {
		title: 'Join the club',
		action: '/join-the-club',
		errs,
		inputs: [{ label: 'Secret code', name: 'secretCode' }],
		submissionLabel: 'Join',
	});

const getJoinTheClub = (_req, res) => render(res);

const joinClub = [
	validation,
	async (req, res) => {
		const errs = validationResult(req);
		if (!errs.isEmpty()) return render(res, errs.array());

		const { secretCode } = matchedData(req);
		const { id } = req.user;

		secretCode === ADMIN_CODE
			? await userModel.updateAdminStatus(id)
			: await userModel.updateMemberStatus(id);

		res.redirect('/');
	},
];

export { getJoinTheClub, joinClub };
