const getIndex = (req, res) => res.render('index');

const logOut = (req, res, next) => {
	req.logout((err) => err != null && next(err));
	res.redirect('/');
};

export { getIndex, logOut };
