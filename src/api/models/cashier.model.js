const mongoose = require('mongoose');
const CashierSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: [true, 'username required'],
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: [true, 'password required'],
	},
	branchId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Branch',
	},
	email: { type: String, required: true, unique: true },
	image: { type: String },
});

module.exports = mongoose.model('Cashier', CashierSchema);
