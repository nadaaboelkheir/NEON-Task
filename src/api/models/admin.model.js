const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../../config/constant');
const AdminSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'email required'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'password required'],
	},
});

AdminSchema.pre('save', async function (next) {
	if (this.isModified('password') || this.isNew) {
		const salt = await bcrypt.genSalt(SALT_ROUNDS);

		this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});
module.exports = mongoose.model('Admin', AdminSchema);
