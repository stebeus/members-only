const postFields = {
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
