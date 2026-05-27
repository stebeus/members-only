import { Pool } from 'pg';

import { DB_URL } from '#root/config.js';

const pool = new Pool({
	connectionString: DB_URL,
});

const query = (sql, params) => pool.query(sql, params);

export { pool, query };
