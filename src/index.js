import express from 'express';
import cors from 'cors';

import connect from './db.js';

const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati

app.use(cors());

app.get('/', (_, res) => {
	res.json({ status: 'Radi :)' });
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
