import postgres from 'postgres';

import { DB_URL } from '#root/config.js';

const sql = Object.freeze(
	postgres(DB_URL, {
		debug: true,
		transform: postgres.camel,
		types: {
			bigint: postgres.BigInt,
		},
	}),
);

export { sql };
