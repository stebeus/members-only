import { Router } from 'express';

import { getLogIn, logInAuth } from '#root/controllers/forms/log-in.js';
import { getSignUp, signUp } from '#root/controllers/forms/sign-up.js';

const router = Router();

router.get('/sign-up', getSignUp);
router.get('/log-in', getLogIn);

router.post('/sign-up', signUp);
router.post('/log-in', logInAuth);

export { router as forms };
