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

const updateUserMembership = async (id) =>
	await query(
		'UPDATE users SET is_member = true, updated_at = NOW() WHERE id = $1',
		[id],
	);

const createPost = async (userId, title, content) =>
	await query(
		'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3)',
		[userId, title, content],
	);

const getAllPosts = async () => {
	const { rows } = await query('SELECT * FROM posts');
	return rows;
};

const deletePost = async (id) =>
	await query('DELETE FROM posts WHERE id = $1', [id]);

const getAllPostsWithUsers = async () => {
	const { rows } = await query(`
		SELECT
			posts.id,
			users.full_name,
			users.username,
			posts.title,
			posts.content,
			posts.created_at
		FROM posts
		INNER JOIN users
		ON posts.user_id = users.id
	`);

	return rows;
};

export {
	createPost,
	createUser,
	deletePost,
	getAllPosts,
	getAllPostsWithUsers,
	getUserById,
	getUserByUsername,
	updateUserMembership,
};
