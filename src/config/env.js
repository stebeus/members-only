import { env, loadEnvFile } from 'node:process';

try {
	loadEnvFile();
} catch (err) {
	if (err.code !== 'ENOENT') throw err;
}

export const {
	ADMIN_CODE,
	CLUB_CODE,
	DB_URL,
	PORT = 3000,
	SESSION_SECRET,
} = env;
