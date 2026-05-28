import { Router } from 'express';

import {
	getJoinTheClub,
	joinTheClub,
} from '#root/controllers/forms/join-the-club/handler.js';
import { getLogIn, logInAuth } from '#root/controllers/forms/log-in.js';
import { getSignUp, signUp } from '#root/controllers/forms/sign-up/handler.js';

const router = Router();

router.get('/sign-up', getSignUp);
router.get('/log-in', getLogIn);
router.get('/join-the-club', getJoinTheClub);

router.post('/sign-up', signUp);
router.post('/log-in', logInAuth);
router.post('/join-the-club', joinTheClub);

export { router as forms };
