const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
	name: { type: String, required: true },
	image: { type: String },
	price: { type: Number, required: true },
	category: { type: String, required: true },
});

module.exports = mongoose.model('Product', ProductSchema);
