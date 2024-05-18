const jwt = require('jsonwebtoken');
const AdminModel = require('../models/admin.model');
const { ApiError } = require('../helpers/errorHandler');
const AsyncHandler = require('express-async-handler');
const { JWT_LOGIN_SECRET_KEY } = require('../helpers/env');

const checkTokenAuthorization = (req) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		throw new ApiError('No Authorization header', 401);
	}
	if (!authHeader.startsWith('Bearer ')) {
		throw new ApiError(
			'No valid Authorization header with Bearer token',
			401,
		);
	}
};

exports.protectRoutes = AsyncHandler(async (req, res, next) => {
	checkTokenAuthorization(req);

	const token = req.headers.authorization.split(' ')[1];
	const decodedToken = jwt.verify(
		token,
		JWT_LOGIN_SECRET_KEY,
		(err, decoded) => {
			if (err) {
				throw new ApiError(err.message, 401);
			}
			return decoded;
		},
	);

	const admin = await AdminModel.findById(decodedToken.id);

	if (!admin) {
		throw new ApiError('Not authorized to access this resource', 401);
	}
	req.admin = admin;
	next();
});
