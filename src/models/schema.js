const timestamps = [
	'created_at TIMESTAMPTZ DEFAULT NOW()',
	'updated_at TIMESTAMPTZ',
];

const [updatedAt] = timestamps;

export const schema = `
	CREATE TABLE IF NOT EXISTS users (
		id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		full_name VARCHAR (100) NOT NULL,
		username VARCHAR (25) NOT NULL,
		password TEXT NOT NULL,
		is_member BOOLEAN NOT NULL,
		is_admin BOOLEAN NOT NULL,
		${timestamps}
	);

	CREATE TABLE IF NOT EXISTS posts (
		id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		user_id BIGINT REFERENCES users (id),
		title VARCHAR (50) NOT NULL,
		content VARCHAR(500) NOT NULL,
		${updatedAt}
	);
`;
