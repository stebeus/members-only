import { getAllPostsWithUsers } from '#root/models/model.js';

const getIndex = async (req, res) => {
	const posts = await getAllPostsWithUsers();
	res.render('index', { posts });
};

const logOut = (req, res, next) => {
	req.logout((err) => err != null && next(err));
	res.redirect('/');
};

export { getIndex, logOut };
