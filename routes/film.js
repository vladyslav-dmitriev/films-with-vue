const express = require('express');
const router = express.Router();
const Film = require('../models/Film');

router.get('/', async (req, res) => {
	const films = await Film.find({})
	res.status(200).json(films); // указываем данные, которые хотим отправить обратно с сервера на клиент
});

router.post('/', async (req, res) => {

	const filmData = {
		id: req.body.id,
		name: req.body.name,
		year: req.body.year,
		format: req.body.format,
		actors: req.body.actors
	}

	const film = new Film(filmData); // создать новый фильм с помощью модели Film на основе данных filmData
	await film.save(); // созраняем в базе данных
	res.status(201).json(film); // 201 - статус испльзуется после создания чего-либо
});

router.delete('/:filmId', async (req, res) => {
	await Film.remove({id: req.params.filmId});
	res.status(200).json({
		message: 'Фильм успешно удален!'
	})
});

module.exports = router;