import postgres from 'postgres';

import { DB_URL } from '#root/config.js';

export const sql = postgres(DB_URL, {
	debug: true,
	transform: postgres.camel,
	types: {
		bigint: postgres.BigInt,
	},
});
