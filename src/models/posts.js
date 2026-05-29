import { query } from '#root/lib/pg.js';

const createPost = async (userId, title, content) =>
	await query(
		'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3)',
		[userId, title, content],
	);

const getAllPosts = async () => {
	const { rows } = await query(`
		SELECT
			posts.id,
			users.full_name AS author_full_name,
			users.username AS author_username,
			posts.title,
			posts.content,
			posts.created_at
		FROM posts
		INNER JOIN users
		ON posts.user_id = users.id
	`);

	return rows;
};

const deletePost = async (id) =>
	await query('DELETE FROM posts WHERE id = $1', [id]);

export { createPost, deletePost, getAllPosts };
