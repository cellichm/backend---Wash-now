import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
const mongo = require('mongodb');

import connect from './db.js';

import auth from './auth.js';

const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati

app.use(cors());

// Needed to process JSON request body properly.
app.use(express.json());

app.get('/', (_, res) => {
	res.json({ status: 'Radi :)' });
});

// Auth/JWT.
app.post('/users', async (req, res) => {
	const document = req.body;

	if (!document) {
		res.json({
			status: 'error',
			error: 'New entry not provided. Send it as JSON in request body.',
			data: null,
		});
		return;
	}

	let id;

	try {
		id = await auth.registerUser(document);
	} catch (error) {
		res.status(500).json({
			status: 'error',
			error: error.message,
			data: null,
		});
	}

	res.json({
		status: 'ok',
		data: id,
	});
});

app.post('/auth', async (req, res) => {
	const document = req.body;

	if (!document) {
		res.json({
			status: 'error',
			error: 'Login data not provided (username and password). Send it as JSON in request body.',
			data: null,
		});
		return;
	}

	try {
		const userData = await auth.authenticateUser(document.username, document.password);
		const result = userData;

		res.json({
			status: 'ok',
			data: result,
		});
	} catch (error) {
		res.status(401).json({
			status: 'error',
			error: error.message,
			data: null,
		});
	}
});

// Deletes.
app.delete('/user/:id', [auth.verify], async (req, res) => {
	const id = req.params.id;

	if (!id) {
		res.json({
			status: 'error',
			error: 'ID for deletion not provided.',
			data: null,
		});
		return;
	}

	try {
		const db = await connect();
		const result = await db.collection('users').deleteOne(
			{ _id: new mongo.ObjectId(id) }
		);

		if (result.deletedCount) {
			res.json({
				status: 'ok',
				data: result,
			});
		} else {
			res.json({
				status: 'error',
				error: 'Failed to delete.',
				data: result,
			});
		}
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
	}
});

app.delete('/location/:id', [auth.verify], async (req, res) => {
	const id = req.params.id;

	if (!id) {
		res.json({
			status: 'error',
			error: 'ID for deletion not provided.',
			data: null,
		});
		return;
	}

	try {
		const db = await connect();
		const result = await db.collection('locations').deleteOne(
			{ _id: new mongo.ObjectId(id) }
		);

		if (result.deletedCount) {
			res.json({
				status: 'ok',
				data: result,
			});
		} else {
			res.json({
				status: 'error',
				error: 'Failed to delete.',
				data: result,
			});
		}
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
	}
});

app.delete('/reservation/:id', [auth.verify], async (req, res) => {
	const id = req.params.id;

	if (!id) {
		res.json({
			status: 'error',
			error: 'ID for deletion not provided.',
			data: null,
		});
		return;
	}

	try {
		const db = await connect();
		const result = await db.collection('reservations').deleteOne(
			{ _id: new mongo.ObjectId(id) }
		);

		if (result.deletedCount) {
			res.json({
				status: 'ok',
				data: result,
			});
		} else {
			res.json({
				status: 'error',
				error: 'Failed to delete.',
				data: result,
			});
		}
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
	}
});

app.delete('/wash-program/:id', [auth.verify], async (req, res) => {
	const id = req.params.id;

	if (!id) {
		res.json({
			status: 'error',
			error: 'ID for deletion not provided.',
			data: null,
		});
		return;
	}

	try {
		const db = await connect();
		const result = await db.collection('washPrograms').deleteOne(
			{ _id: new mongo.ObjectId(id) }
		);

		if (result.deletedCount) {
			res.json({
				status: 'ok',
				data: result,
			});
		} else {
			res.json({
				status: 'error',
				error: 'Failed to delete.',
				data: result,
			});
		}
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
	}
});

app.delete('/wash-step/:id', [auth.verify], async (req, res) => {
	const id = req.params.id;

	if (!id) {
		res.json({
			status: 'error',
			error: 'ID for deletion not provided.',
			data: null,
		});
		return;
	}

	try {
		const db = await connect();
		const result = await db.collection('washSteps').deleteOne(
			{ _id: new mongo.ObjectId(id) }
		);

		if (result.deletedCount) {
			res.json({
				status: 'ok',
				data: result,
			});
		} else {
			res.json({
				status: 'error',
				error: 'Failed to delete.',
				data: result,
			});
		}
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
	}
});

// Patches.
app.patch('/user/:id', [auth.verify], async (req, res) => {
	const document = req.body;
	delete document._id;

	const id = req.params.id;

	if (!document) {
		res.json({
			status: 'error',
			error: 'Data to update not provided. Send it as JSON in request body.',
			data: null,
		});
		return;
	}

	try {
		const db = await connect();
		const result = await db.collection('users').updateOne(
			{ _id: new mongo.ObjectId(id) },
			{ $set: document }
		);

		if (result.modifiedCount) {
			res.json({
				status: 'ok',
				data: result,
			});
		} else {
			res.json({
				status: 'error',
				error: 'Failed to update.',
				data: result,
			});
		}
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
	}
});

app.patch('/location/:id', [auth.verify], async (req, res) => {
	const document = req.body;
	delete document._id;

	const id = req.params.id;

	if (!document) {
		res.json({
			status: 'error',
			error: 'Data to update not provided. Send it as JSON in request body.',
			data: null,
		});
		return;
	}

	try {
		const db = await connect();
		const result = await db.collection('locations').updateOne(
			{ _id: new mongo.ObjectId(id) },
			{ $set: document }
		);

		if (result.modifiedCount) {
			res.json({
				status: 'ok',
				data: result,
			});
		} else {
			res.json({
				status: 'error',
				error: 'Failed to update.',
				data: result,
			});
		}
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
	}
});

app.patch('/reservation/:id', [auth.verify], async (req, res) => {
	const document = req.body;
	delete document._id;

	const id = req.params.id;

	if (!document) {
		res.json({
			status: 'error',
			error: 'Data to update not provided. Send it as JSON in request body.',
			data: null,
		});
		return;
	}

	try {
		const db = await connect();
		const result = await db.collection('reservations').updateOne(
			{ _id: new mongo.ObjectId(id) },
			{ $set: document }
		);

		if (result.modifiedCount) {
			res.json({
				status: 'ok',
				data: result,
			});
		} else {
			res.json({
				status: 'error',
				error: 'Failed to update.',
				data: result,
			});
		}
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
	}
});

app.patch('/wash-program/:id', [auth.verify], async (req, res) => {
	const document = req.body;
	delete document._id;

	const id = req.params.id;

	if (!document) {
		res.json({
			status: 'error',
			error: 'Data to update not provided. Send it as JSON in request body.',
			data: null,
		});
		return;
	}

	try {
		const db = await connect();
		const result = await db.collection('washPrograms').updateOne(
			{ _id: new mongo.ObjectId(id) },
			{ $set: document }
		);

		if (result.modifiedCount) {
			res.json({
				status: 'ok',
				data: result,
			});
		} else {
			res.json({
				status: 'error',
				error: 'Failed to update.',
				data: result,
			});
		}
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
	}
});

app.patch('/wash-step/:id', [auth.verify], async (req, res) => {
	const document = req.body;
	delete document._id;

	const id = req.params.id;

	if (!document) {
		res.json({
			status: 'error',
			error: 'Data to update not provided. Send it as JSON in request body.',
			data: null,
		});
		return;
	}

	try {
		const db = await connect();
		const result = await db.collection('washSteps').updateOne(
			{ _id: new mongo.ObjectId(id) },
			{ $set: document }
		);

		if (result.modifiedCount) {
			res.json({
				status: 'ok',
				data: result,
			});
		} else {
			res.json({
				status: 'error',
				error: 'Failed to update.',
				data: result,
			});
		}
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
	}
});

// Inserts.
app.post('/locations', [auth.verify], async (req, res) => {
	const document = req.body;

	if (!document) {
		res.json({
			status: 'error',
			error: 'New entry not provided. Send it as JSON in request body.',
			data: null,
		});
		return;
	}

	try {
		const db = await connect();
		const result = await db.collection('locations').insertOne(document);

		if (result.insertedId) {
			res.json({
				status: 'ok',
				data: {
					mongoId: result.insertedId,
				},
			});
		} else {
			res.json({
				status: 'error',
				error: 'Failed to insert.',
				data: result,
			});
		}
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
	}
});

app.post('/reservations', [auth.verify], async (req, res) => {
	const document = req.body;

	if (!document) {
		res.json({
			status: 'error',
			error: 'New entry not provided. Send it as JSON in request body.',
			data: null,
		});
		return;
	}

	try {
		const db = await connect();
		const result = await db.collection('reservations').insertOne(document);

		if (result.insertedId) {
			res.json({
				status: 'ok',
				data: {
					mongoId: result.insertedId,
				},
			});
		} else {
			res.json({
				status: 'error',
				error: 'Failed to insert.',
				data: result,
			});
		}
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
	}
});

app.post('/wash-programs', [auth.verify], async (req, res) => {
	const document = req.body;

	if (!document) {
		res.json({
			status: 'error',
			error: 'New entry not provided. Send it as JSON in request body.',
			data: null,
		});
		return;
	}

	try {
		const db = await connect();
		const result = await db.collection('washPrograms').insertOne(document);

		if (result.insertedId) {
			res.json({
				status: 'ok',
				data: {
					mongoId: result.insertedId,
				},
			});
		} else {
			res.json({
				status: 'error',
				error: 'Failed to insert.',
				data: result,
			});
		}
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
	}
});

app.post('/wash-steps', [auth.verify], async (req, res) => {
	const document = req.body;

	if (!document) {
		res.json({
			status: 'error',
			error: 'New entry not provided. Send it as JSON in request body.',
			data: null,
		});
		return;
	}

	try {
		const db = await connect();
		const result = await db.collection('washSteps').insertOne(document);

		if (result.insertedId) {
			res.json({
				status: 'ok',
				data: {
					mongoId: result.insertedId,
				},
			});
		} else {
			res.json({
				status: 'error',
				error: 'Failed to insert.',
				data: result,
			});
		}
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
	}
});

// Get by ID.
app.get('/user/:username', async (req, res) => {
	const username = req.params.username;

	if (!username) {
		res.json({
			status: 'error',
			error: 'Username not provided.',
			data: null,
		});
		return;
	}

	let user;

	try {
		const db = await connect();
		user = await db.collection('users').findOne({
			username: username,
		});
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
		return;
	}

	if (!user) {
		res.json({
			status: 'ok',
			error: null,
			data: `No users found with username "${username}".`,
		});
		return;
	}

	res.json({
		status: 'ok',
		error: null,
		data: user,
	});
});

app.get('/wash-step/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	if (isNaN(id)) {
		res.json({
			status: 'error',
			error: 'ID not provided.',
			data: null,
		});
		return;
	}

	let item;

	try {
		const db = await connect();
		item = await db.collection('washSteps').findOne({
			id: id,
		});
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
		return;
	}

	if (!item) {
		res.json({
			status: 'ok',
			error: null,
			data: `No wash steps found with ID "${username}".`,
		});
		return;
	}

	res.json({
		status: 'ok',
		error: null,
		data: item,
	});
});

app.get('/wash-program/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	if (isNaN(id)) {
		res.json({
			status: 'error',
			error: 'ID not provided.',
			data: null,
		});
		return;
	}

	let item;

	try {
		const db = await connect();
		item = await db.collection('washPrograms').findOne({
			id: id,
		});
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
		return;
	}

	if (!item) {
		res.json({
			status: 'ok',
			error: null,
			data: `No wash programs found with ID "${username}".`,
		});
		return;
	}

	res.json({
		status: 'ok',
		error: null,
		data: item,
	});
});

app.get('/location/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	if (isNaN(id)) {
		res.json({
			status: 'error',
			error: 'ID not provided.',
			data: null,
		});
		return;
	}

	let item;

	try {
		const db = await connect();
		item = await db.collection('locations').findOne({
			id: id,
		});
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
		return;
	}

	if (!item) {
		res.json({
			status: 'ok',
			error: null,
			data: `No locations found with ID "${username}".`,
		});
		return;
	}

	res.json({
		status: 'ok',
		error: null,
		data: item,
	});
});

app.get('/reservation/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	if (isNaN(id)) {
		res.json({
			status: 'error',
			error: 'ID not provided.',
			data: null,
		});
		return;
	}

	let item;

	try {
		const db = await connect();
		item = await db.collection('reservations').findOne({
			id: id,
		});
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
		return;
	}

	if (!item) {
		res.json({
			status: 'ok',
			error: null,
			data: `No reservations found with ID "${username}".`,
		});
		return;
	}

	res.json({
		status: 'ok',
		error: null,
		data: item,
	});
});

// Get all.
app.get('/users', async (_, res) => {
	try {
		const db = await connect();
		const cursor = await db.collection('users').find();
		const results = await cursor.toArray();

		res.json({
			status: 'ok',
			error: null,
			data: results,
		});
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
	}
});

app.get('/wash-steps', async (_, res) => {
	try {
		const db = await connect();
		const cursor = await db.collection('washSteps').find();
		const results = await cursor.toArray();

		res.json({
			status: 'ok',
			error: null,
			data: results,
		});
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
	}
});

app.get('/wash-programs', async (_, res) => {
	try {
		const db = await connect();
		const cursor = await db.collection('washPrograms').find();
		const results = await cursor.toArray();

		res.json({
			status: 'ok',
			error: null,
			data: results,
		});
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
	}
});

app.get('/locations', async (_, res) => {
	try {
		const db = await connect();
		const cursor = await db.collection('locations').find();
		const results = await cursor.toArray();

		res.json({
			status: 'ok',
			error: null,
			data: results,
		});
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
	}
});

app.get('/reservations', async (req, res) => {
	const query = req.query;

	let dbQuery = {};

	if (query.date) {
		dbQuery = {
			date: query.date,
		};
	}

	try {
		const db = await connect();
		const cursor = await db.collection('reservations').find(dbQuery);
		const results = await cursor.toArray();

		res.json({
			status: 'ok',
			error: null,
			data: results,
		});
	} catch (error) {
		res.json({
			status: 'error',
			error: error,
			data: null,
		});
	}
});

app.listen(port, () => console.log(`\n\n[DONE] Backend se vrti na http://localhost:${port}/\n\n`));
