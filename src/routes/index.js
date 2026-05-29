import { Router } from 'express';

import { getIndex, logOut } from '#root/controllers/index.js';

const router = Router();

router.get('/', getIndex);
router.get('/log-out', logOut);

export { router as index };
