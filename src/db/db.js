import { sql } from '#root/lib/postgres.js';

const createUser = async (fullName, username, password) =>
	await sql`
    INSERT INTO users (full_name, username, password)
    VALUES (${fullName}, ${username}, ${password})
  `;

const getUserById = async (id) => {
	const [user] = await sql`SELECT * FROM users WHERE id = ${id}`;
	return user;
};

const getUserByUsername = async (username) => {
	const [user] = await sql`SELECT * FROM users WHERE username = ${username}`;
	return user;
};

export { createUser, getUserById, getUserByUsername };
