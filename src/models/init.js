import { Client } from 'pg';

import { DB_URL } from '#root/config.js';
import { logger } from '#root/lib/pino.js';

import { schema } from './schema.js';

const init = async () => {
	logger.info('Initializing database...');

	const client = new Client({ connectionString: DB_URL });

	await client.connect();
	await client.query(schema);
	await client.end();

	logger.info('Done');
};

init();
