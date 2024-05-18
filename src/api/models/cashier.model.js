const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

CashierSchema.pre('save', async function (next) {
	if (this.isModified('password') || this.isNew) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});
module.exports = mongoose.model('Cashier', CashierSchema);
