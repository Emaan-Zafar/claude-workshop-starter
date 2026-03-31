const express = require('express');
const router = express.Router();
const { add, subtract, multiply, divide } = require('../services/math-utils');
const { validateNumericInput } = require('../middleware/validate-input');

router.get('/add', (req, res) => {
  const checkA = validateNumericInput(req.query.a);
  const checkB = validateNumericInput(req.query.b);
  if (!checkA.valid) return res.status(400).json({ error: `param a: ${checkA.reason}` });
  if (!checkB.valid) return res.status(400).json({ error: `param b: ${checkB.reason}` });
  res.json({ result: add(parseFloat(req.query.a), parseFloat(req.query.b)) });
});

router.get('/subtract', (req, res) => {
  const checkA = validateNumericInput(req.query.a);
  const checkB = validateNumericInput(req.query.b);
  if (!checkA.valid) return res.status(400).json({ error: `param a: ${checkA.reason}` });
  if (!checkB.valid) return res.status(400).json({ error: `param b: ${checkB.reason}` });
  res.json({ result: subtract(parseFloat(req.query.a), parseFloat(req.query.b)) });
});

router.get('/multiply', (req, res) => {
  const checkA = validateNumericInput(req.query.a);
  const checkB = validateNumericInput(req.query.b);
  if (!checkA.valid) return res.status(400).json({ error: `param a: ${checkA.reason}` });
  if (!checkB.valid) return res.status(400).json({ error: `param b: ${checkB.reason}` });
  res.json({ result: multiply(parseFloat(req.query.a), parseFloat(req.query.b)) });
});

router.get('/divide', (req, res) => {
  const checkA = validateNumericInput(req.query.a);
  const checkB = validateNumericInput(req.query.b);
  if (!checkA.valid) return res.status(400).json({ error: `param a: ${checkA.reason}` });
  if (!checkB.valid) return res.status(400).json({ error: `param b: ${checkB.reason}` });
  const b = parseFloat(req.query.b);
  if (b === 0) return res.status(400).json({ error: 'division by zero is not allowed' });
  res.json({ result: divide(parseFloat(req.query.a), b) });
});

module.exports = router;
