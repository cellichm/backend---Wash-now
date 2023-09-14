import connect from './db.js';
import bcyrpt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
	},
	async authenticateUser(username, password) {
		try {
			const db = await connect();
			const user = await db.collection('users').findOne({
				username: username
			});

			if (user && user.password && (await bcyrpt.compare(password, user.password))) {
				delete user.password;
				const token = jwt.sign(user, 'secret', {
					algorithm: 'HS512',
					expiresIn: '1 week',
				});

				return {
					token
				};
			} else {
				throw new Error('Authentication failed.');
			}
		} catch (error) {
			return error.message;
		}
	},
	verify(req, res, next) {
		try {
			const receivedToken = req.headers.authorization.split(' ');
			const tokenType = receivedToken[0];

			if (tokenType !== 'Bearer') {
				res.status(401).send();
				return false;
			}

			const token = receivedToken[1];

			req.jwt = jwt.verify(token, 'secret');

			return next();
		} catch (error) {
			res.status(401).send();
			return false;
		}
	}
};