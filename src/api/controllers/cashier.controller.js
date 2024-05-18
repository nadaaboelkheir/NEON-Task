const AsyncHandler = require('express-async-handler');
const CashierModel = require('../models/cashier.model');
const { ApiError } = require('../helpers/errorHandler');

exports.createCashier = AsyncHandler(async (req, res, next) => {
	const { userName, password, email, image } = req.body;
	const existingUser = await CashierModel.findOne({
		$or: [{ userName }, { email }],
	});

	if (existingUser) {
		return next(new ApiError('Username or email already exists', 400));
	}
	const newCashier = new CashierModel({
		userName,
		password,
		email,
		image,
	});

	await newCashier.save();

	res.status(201).json({
		message: 'Cashier created successfully',
		cashier: newCashier,
	});
});
exports.getCashierById = AsyncHandler(async (req, res, next) => {
	const { id } = req.params;

	const cashier = await CashierModel.findById(id);

	if (!cashier) {
		return next(new ApiError('Cashier not found', 404));
	}

	res.status(200).json({ cashier });
});
exports.updateCashierById = AsyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const { userName, image } = req.body;

	const cashier = await CashierModel.findById(id);

	if (!cashier) {
		return next(new ApiError('Cashier not found', 404));
	}

	if (userName) cashier.userName = userName;
	if (image) cashier.image = image;

	await cashier.save();

	res.status(200).json({ message: 'Cashier updated successfully', cashier });
});
exports.deleteCashierById = AsyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const cashier = await CashierModel.findById(id);

	if (!cashier) {
		return next(new ApiError('Cashier not found', 404));
	}

	await cashier.deleteOne();

	res.status(200).json({ message: 'Cashier deleted successfully' });
});
