import express from 'express';
import storage from './memory_storage.js';
import cors from 'cors';

import connect from './db.js';

const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati

app.use(cors());

app.get('/', (req, res) => {
	res.json({ status: 'Radi :)' });
});

// Get by ID.
app.get('/user/:username', (req, res) => {
	const username = req.params.username;

	if (!username) {
		res.json({
			status: 'error',
			error: 'Username not provided.',
			data: null,
		});
		return;
	}

	const user = storage.users.find((user) => user.username === username);

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

app.get('/wash-step/:id', (req, res) => {
	const id = parseInt(req.params.id);

	if (isNaN(id)) {
		res.json({
			status: 'error',
			error: 'ID not provided.',
			data: null,
		});
		return;
	}

	const result = storage.washSteps.find((item) => item.id === id);

	if (!result) {
		res.json({
			status: 'ok',
			error: null,
			data: `No wash steps found with id "${id}".`,
		});
		return;
	}

	res.json({
		status: 'ok',
		error: null,
		data: result,
	});
});

app.get('/wash-program/:id', (req, res) => {
	const id = parseInt(req.params.id);

	if (isNaN(id)) {
		res.json({
			status: 'error',
			error: 'ID not provided.',
			data: null,
		});
		return;
	}

	const result = storage.washPrograms.find((item) => item.id === id);

	if (!result) {
		res.json({
			status: 'ok',
			error: null,
			data: `No wash programs found with id "${id}".`,
		});
		return;
	}

	res.json({
		status: 'ok',
		error: null,
		data: result,
	});
});

app.get('/location/:id', (req, res) => {
	const id = parseInt(req.params.id);

	if (isNaN(id)) {
		res.json({
			status: 'error',
			error: 'ID not provided.',
			data: null,
		});
		return;
	}

	const result = storage.locations.find((item) => item.id === id);

	if (!result) {
		res.json({
			status: 'ok',
			error: null,
			data: `No locations found with id "${id}".`,
		});
		return;
	}

	res.json({
		status: 'ok',
		error: null,
		data: result,
	});
});

app.get('/reservation/:id', (req, res) => {
	const id = parseInt(req.params.id);

	if (isNaN(id)) {
		res.json({
			status: 'error',
			error: 'ID not provided.',
			data: null,
		});
		return;
	}

	const result = storage.reservations.find((item) => item.id === id);

	if (!result) {
		res.json({
			status: 'ok',
			error: null,
			data: `No reservation found with id "${id}".`,
		});
		return;
	}

	res.json({
		status: 'ok',
		error: null,
		data: result,
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
