const { MongoClient, ServerApiVersion } = require('mongodb');

const connectionString = 'mongodb+srv://admin:admin@wash-now.qykqqhl.mongodb.net/?retryWrites=true&w=majority';

// Mongo client.
const client = new MongoClient(connectionString, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

let db;
let isConnected = false;

export default () => {
	return new Promise((resolve, reject) => {
		if (db && isConnected) {
			resolve(db);
		}

		client.connect((err) => {
			if (err) {
				reject('Spajanje neuspješno');
			}

		})

		db = client.db('washnow');
		resolve(db);
	});
};