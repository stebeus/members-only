import { query } from '#root/lib/pg.js';

const createUser = async (fullName, username, password) =>
	await query(
		`
		INSERT INTO users (full_name, username, password, is_member, is_admin)
		VALUES ($1, $2, $3, false, false)
		`,
		[fullName, username, password],
	);

const getUserById = async (id) => {
	const {
		rows: [user],
	} = await query('SELECT * FROM users WHERE id = $1', [id]);

	return user;
};

const getUserByUsername = async (username) => {
	const {
		rows: [user],
	} = await query('SELECT * FROM users WHERE username = $1', [username]);

	return user;
};

const updateAdminStatus = async (id) =>
	await query(
		`
		UPDATE users
		SET is_member = true, is_admin = true, updated_at = NOW()
		WHERE id = $1
		`,
		[id],
	);

const updateMemberStatus = async (id) =>
	await query(
		'UPDATE users SET is_member = true, updated_at = NOW() WHERE id = $1',
		[id],
	);

export {
	createUser,
	getUserById,
	getUserByUsername,
	updateAdminStatus,
	updateMemberStatus,
};
