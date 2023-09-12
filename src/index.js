import express from 'express';
import storage from './memory_storage.js';
import cors from 'cors';

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
app.get('/users', (_, res) => res.json(storage.users));
app.get('/wash-steps', (_, res) => res.json(storage.washSteps));
app.get('/wash-programs', (_, res) => res.json(storage.washPrograms));
app.get('/locations', (_, res) => res.json(storage.locations));

app.get('/reservations', (req, res) => {
	let items = storage.reservations;

	const query = req.query;

	if (query.day) {
		items = items.filter((item) => item.date === query.day);
	}

	res.json({
		status: 'ok',
		error: null,
		data: items,
	});
});

app.listen(port, () => console.log(`\n\n[DONE] Backend se vrti na http://localhost:${port}/\n\n`));
