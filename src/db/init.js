import { logger } from '#root/lib/pino.js';
import { sql } from '#root/lib/postgres.js';

import { createTables } from './queries.js';
import { tables } from './schema.js';

const init = async () => {
	logger.info('Initializing database...');

	await createTables(...tables);
	await sql.end();

	logger.info('Done');
};

init();
