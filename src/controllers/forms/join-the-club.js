import vine from '@vinejs/vine';

import * as model from '#root/models/model.js';

import { renderForm } from './form.js';

const schema = vine.object({
	secretCode: vine.literal('The Odin Project'),
});

const renderJoinTheClub = (res, errs) =>
	renderForm(res, {
		title: 'Join the club',
		action: '/join-the-club',
		errs,
		inputs: [{ label: 'Secret code', name: 'secretCode' }],
		submissionLabel: 'Join',
	});

const getJoinTheClub = (_req, res) => renderJoinTheClub(res);

const joinTheClub = async (req, res) => {
	try {
		await vine.validate({ schema, data: req.body });

		await model.updateUserMembership(req.user.id);

		res.redirect('/');
	} catch (err) {
		return renderJoinTheClub(res, err.messages);
	}
};

export { getJoinTheClub, joinTheClub };
