import { sql } from '#root/lib/postgres.js';

const createUser = async (fullName, username, password) =>
	await sql`
    INSERT INTO users (full_name, username, password)
    VALUES (${fullName}, ${username}, ${password})
  `;

export { createUser };
