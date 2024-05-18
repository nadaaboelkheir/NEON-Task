const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/auth.controller');
const cashierRoutes = require('./cashier.routes');
const { protectRoutes } = require('../middlewares/auth.mw');
const { cashierLogin } = require('../controllers/auth.controller');

router.use('/cashier', protectRoutes, cashierRoutes);
router.post('/login', adminLogin);

router.post('/cashierLogin', cashierLogin);
module.exports = router;
