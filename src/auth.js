import connect from './db.js';
import bcyrpt from 'bcrypt';

(async () => {
	const db = await connect();
	await db.collection('users').createIndex({ username: 1 }, { unique: true });
})();

export default {
	async registerUser(document) {
		try {
			const db = await connect();
			const result = await db.collection('users').insertOne({
				...document,
				password: await bcyrpt.hash(document.password, 8),
			});

			return result.insertedId;
		} catch (error) {
			if (error.name === 'MongoServerError' && error.code === 11000) {
				throw new Error('Username already exists');
			}
		}
	}
};