import { Router } from 'express';

import {
	createPost,
	deletePost,
	getCreatePost,
} from '#root/controllers/forms/create-post/handler.js';
import {
	getJoinTheClub,
	joinClub,
} from '#root/controllers/forms/join-the-club/handler.js';
import { getLogIn, logIn } from '#root/controllers/forms/log-in.js';
import { getSignUp, signUp } from '#root/controllers/forms/sign-up/handler.js';

const router = Router();

router.get('/create-post', getCreatePost);
router.get('/delete-post/:postId', deletePost);
router.get('/log-in', getLogIn);
router.get('/join-the-club', getJoinTheClub);
router.get('/sign-up', getSignUp);

router.post('/create-post', createPost);
router.post('/join-the-club', joinClub);
router.post('/log-in', logIn);
router.post('/sign-up', signUp);

export { router as forms };
