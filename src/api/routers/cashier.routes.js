const express = require('express');
const router = express.Router();
const { cashierLogin } = require('../controllers/auth.controller');
const {
	createCashier,
	getCashierById,
	updateCashierById,
	deleteCashierById,
} = require('../controllers/cashier.controller');

router.post('/createCashier', createCashier);
router.get('/getCashierById/:id', getCashierById);
router.put('/updateCashierById/:id', updateCashierById);
router.delete('/deleteCashierById/:id', deleteCashierById);

router.post('/login', cashierLogin);
module.exports = router;
