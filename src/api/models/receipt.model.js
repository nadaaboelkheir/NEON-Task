const mongoose = require('mongoose');
const ReceiptSchema = new mongoose.Schema({
	cashierId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Cashier',
		required: true,
	},
	branchId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Branch',
		required: true,
	},
	products: [
		{
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
				required: true,
			},
			quantity: { type: Number, required: true },
		},
	],
	totalAmount: { type: Number, required: true },
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Receipt', ReceiptSchema);
