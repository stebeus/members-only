import { env, loadEnvFile } from 'node:process';

try {
	loadEnvFile();
} catch (error) {
	if (error.code !== 'ENOENT') throw error;
}

export const { DB_URL, PORT = 3000, SESSION_SECRET } = env;
