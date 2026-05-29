import { maxChar } from '#root/config/constants.js';

const timestamps = [
	'created_at TIMESTAMPTZ DEFAULT NOW()',
	'updated_at TIMESTAMPTZ',
];

const [updatedAt] = timestamps;

export const schema = `
	CREATE TABLE IF NOT EXISTS users (
		id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		full_name VARCHAR (${maxChar.user.default}) NOT NULL,
		username VARCHAR (${maxChar.user.username}) NOT NULL,
		password VARCHAR(${maxChar.user.default}) NOT NULL,
		is_member BOOLEAN NOT NULL,
		is_admin BOOLEAN NOT NULL,
		${timestamps}
	);

	CREATE TABLE IF NOT EXISTS posts (
		id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		user_id BIGINT REFERENCES users (id),
		title VARCHAR (${maxChar.post.title}) NOT NULL,
		content VARCHAR(${maxChar.post.content}) NOT NULL,
		${updatedAt}
	);
`;
