import { join } from 'node:path';

import express from 'express';
import passport from 'passport';

import { PORT } from './config.js';
import { handleError, handleNotFoundError } from './controllers/errors.js';
import { expressSession } from './lib/express-session.js';
import { logger, pino } from './lib/pino.js';
import { forms } from './routes/forms.js';
import { index } from './routes/index.js';

const app = express();

// Setup

const { dirname } = import.meta;
const viewsPath = join(dirname, 'views');

app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.use(pino);

app.use(expressSession);
app.use(passport.session());

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// App

app.use(index);
app.use(forms);

app.use(handleNotFoundError);
app.use(handleError);

// Listener

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
