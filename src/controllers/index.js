import * as postModel from '#root/models/posts.js';

const getIndex = async (_req, res) => {
	const posts = await postModel.getAllPosts();
	res.render('index', { posts });
};

const logOut = (req, res, next) => {
	req.logout((err) => err != null && next(err));
	res.redirect('/');
};

export { getIndex, logOut };
