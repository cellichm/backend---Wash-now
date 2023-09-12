// Datoteka: src/memory_storage.js

let storage = {
	users: [
		{
			username: 'mcellich',
			email: 'mcellich@email.com',
			car: {
				type: 'BMW Series 3 2018',
				registration: 'PU123NO',
			},
		},
	],
	washSteps: [
		{
			id: 1,
			description: 'Ispiranje običnom vodom',
			durationMinutes: 5,
			price: 1,
		},
		{
			id: 2,
			description: 'Pranje pjenom',
			durationMinutes: 15,
			price: 1,
		},
		{
			id: 3,
			description: 'Ispiranje demineraliziranom vodom',
			durationMinutes: 5,
			price: 2,
		},
		{
			id: 4,
			description: 'Vosak',
			durationMinutes: 30,
			price: 2,
		}
	],
	washPrograms: [
		{
			id: 1,
			name: 'Standardno pranje',
			steps: [1, 2, 4],
			totalDurationMinutes: 50,
		},
		{
			id: 2,
			name: 'Ispiranje',
			steps: [1],
			totalDurationMinutes: 5,
		},
		{
			id: 2,
			name: 'Ispiranje + vosak',
			steps: [1, 4],
			totalDurationMinutes: 35,
		}
	],
	locations: [
		{
			id: 'pula-city-mall',
			name: 'Pula City Mall',
			address: 'Ul. Rimske centurijacije 101, 52100, Pula',
			workHours: '0-24',
			contact: '+38552123456',
		}
	],
	reservations: [
		{
			id: 1,
			location: 'pula-city-mall',
			user: 'mcellich',
			date: '2023-09-10',
			timeStart: '11:00',
			timeEnd: '11:50',
			washProgram: 1,
		},
	]
}
export default storage;