const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
	id: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	year: {
		type: Number,
		required: true
	},
	format: {
		type: String,
		required: true
	},
	actors: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('films', filmSchema);