const AsyncHandler = require('express-async-handler');
const AdminModel = require('../models/admin.model');

exports.createAdminIfNotExists = AsyncHandler(async () => {
	const admin = await AdminModel.findOne({ email: 'admin@gmail.com' });

	if (admin) {
		console.log('Admin user already exists');
		return;
	}
	// If no admin exists with the specified email, create a default admin
	const newAdmin = new AdminModel({
		email: 'admin@gmail.com',
		password: 'Admin@123',
	});

	await newAdmin.save();
	console.log('Admin user created');
});
