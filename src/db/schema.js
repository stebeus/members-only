const timestamp = 'created_at TIMESTAMPTZ DEFAULT NOW()';

const tables = Object.freeze([
	{
		name: 'users',
		columns: [
			'full_name VARCHAR (100) NOT NULL',
			'username VARCHAR (25) NOT NULL',
			'password TEXT NOT NULL',
			'is_member BOOLEAN NOT NULL',
			timestamp,
		],
	},
]);

export { tables };
