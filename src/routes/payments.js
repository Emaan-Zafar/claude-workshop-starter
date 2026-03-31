const express = require('express');
const router = express.Router();
const { calculateTotal, applyDiscount } = require('../services/payment-service');
const { validateNumericInput, validatePaymentItems } = require('../middleware/validate-input');

router.post('/calculate-total', (req, res) => {
  const check = validatePaymentItems(req.body.items);
  if (!check.valid) return res.status(400).json({ error: check.reason });
  const total = calculateTotal(req.body.items);
  res.json({ total });
});

router.get('/apply-discount', (req, res) => {
  const checkTotal = validateNumericInput(req.query.total);
  const checkDiscount = validateNumericInput(req.query.discount);
  if (!checkTotal.valid) return res.status(400).json({ error: `param total: ${checkTotal.reason}` });
  if (!checkDiscount.valid) return res.status(400).json({ error: `param discount: ${checkDiscount.reason}` });
  const result = applyDiscount(parseFloat(req.query.total), parseFloat(req.query.discount));
  if (!result.valid) return res.status(400).json({ error: result.reason });
  res.json({ discountedTotal: result.result });
});

module.exports = router;
