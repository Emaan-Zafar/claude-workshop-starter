const { calculateTotal, applyDiscount } = require('../src/services/payment-service');

console.log('  Payment Service Tests:');

// --- calculateTotal ---

assert(
  calculateTotal([{ price: 10, qty: 2, taxable: false }]) === 20,
  'calculateTotal: two non-taxable items at $10 = $20'
);

assertAlmostEqual(
  calculateTotal([{ price: 10, qty: 1 }]),
  10.85,
  'calculateTotal: one taxable item at $10 = $10.85'
);

assertAlmostEqual(
  calculateTotal([
    { price: 10, qty: 1 },
    { price: 5, qty: 2, taxable: false }
  ]),
  20.85,
  'calculateTotal: mixed taxable/non-taxable = $20.85'
);

// Rounding edge case: 1.005 should round to 1.01
// Use an amount where subtotal+tax lands near a .005 boundary
assertAlmostEqual(
  calculateTotal([{ price: 9.30, qty: 1 }]),
  10.09,
  'calculateTotal: rounding edge case $9.30 taxable = $10.09'
);

assert(
  calculateTotal([{ price: 0, qty: 1 }]) === 0,
  'calculateTotal: zero-price item = $0'
);

// --- applyDiscount ---

let r;

r = applyDiscount(100, 10);
assert(r.valid === true && r.result === 90, 'applyDiscount: 10% off $100 = $90');

r = applyDiscount(100, 0);
assert(r.valid === true && r.result === 100, 'applyDiscount: 0% discount = no change');

r = applyDiscount(100, 50);
assert(r.valid === true && r.result === 50, 'applyDiscount: 50% off $100 = $50');

r = applyDiscount(100, 100);
assert(r.valid === true && r.result === 0, 'applyDiscount: 100% discount = $0');

r = applyDiscount(100, 150);
assert(r.valid === false, 'applyDiscount: 150% discount is rejected');

r = applyDiscount(100, -10);
assert(r.valid === false, 'applyDiscount: negative discount is rejected');

r = applyDiscount(NaN, 10);
assert(r.valid === false, 'applyDiscount: NaN total is rejected');

r = applyDiscount(Infinity, 10);
assert(r.valid === false, 'applyDiscount: Infinity total is rejected');

r = applyDiscount(100, NaN);
assert(r.valid === false, 'applyDiscount: NaN discount is rejected');

r = applyDiscount(100, Infinity);
assert(r.valid === false, 'applyDiscount: Infinity discount is rejected');
