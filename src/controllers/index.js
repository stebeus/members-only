import * as postModel from '#root/models/posts.js';
import { formatDate } from '#root/utils/formatters.js';

const getIndex = async (_req, res) => {
	const posts = await postModel.getAllPosts();
	res.render('index', { posts, formatDate });
};

const logOut = (req, res, next) => {
	req.logout((err) => err != null && next(err));
	res.redirect('/');
};

export { getIndex, logOut };
