import vine from '@vinejs/vine';

const props = { autocomplete: 'on', isRequired: true };

const userSchema = {
	username: vine
		.string()
		.trim()
		.alphaNumeric({ allowUnderscores: true })
		.maxLength(25),
	password: vine.string().trim(),
};

const renderForm = (
	res,
	{ title, action, errs, inputs = [], hasTextarea, textarea, submissionLabel },
) => {
	const status = errs == null ? 201 : 400;

	return res.status(status).render('form', {
		title,
		action,
		errs: errs?.messages,
		inputs,
		hasTextarea,
		textarea,
		submissionLabel,
	});
};

export { props, renderForm, userSchema };
