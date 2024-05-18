/* eslint-disable no-undef */
require('dotenv').config();

module.exports = {
	PORT: process.env.PORT,
	DB_URL: process.env.DB_URL,
	JWT_LOGIN_SECRET_KEY: process.env.JWT_LOGIN_SECRET_KEY,
};
