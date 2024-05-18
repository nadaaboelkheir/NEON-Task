const AsyncHandler = require('express-async-handler');
const AdminModel = require('../models/admin.model');
const CashierModel = require('../models/cashier.model');
const { JWT_LOGIN_SECRET_KEY } = require('../helpers/env');
const { ApiError } = require('../helpers/errorHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
exports.adminLogin = AsyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ApiError('Email and password are required', 400));
	}
	const admin = await AdminModel.findOne({ email });

	if (!admin) {
		return next(new ApiError('Invalid email or password', 401));
	}
	const isMatch = await bcrypt.compare(password, admin.password);

	if (!isMatch) {
		return next(new ApiError('Invalid email or password', 401));
	}
	const token = jwt.sign({ id: admin._id }, JWT_LOGIN_SECRET_KEY, {
		expiresIn: '1y',
	});

	return res.status(200).json({ message: 'login success', token });
});

exports.cashierLogin = AsyncHandler(async (req, res, next) => {
	const { email, password } = req.body;
	const cashier = await CashierModel.findOne({ email });

	if (!cashier) {
		return next(new ApiError('Invalid email or password', 401));
	}
	const isMatch = await bcrypt.compare(password, cashier.password);

	if (!isMatch) {
		return next(new ApiError('Invalid email or password', 401));
	}
	const token = jwt.sign({ id: cashier._id }, JWT_LOGIN_SECRET_KEY, {
		expiresIn: '1y',
	});

	return res.status(200).json({ message: 'login success', token });
});
