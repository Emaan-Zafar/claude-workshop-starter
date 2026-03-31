/**
 * LEGACY PAYMENT CALCULATOR
 * Original system: migrated from PowerBuilder datawindow logic
 * Last modified: 2018-03-14 by developer who left the company
 *
 * WARNING: This code uses outdated patterns (var, callbacks, manual loops).
 * It contains known bugs that were "acceptable" in the old system.
 * DO NOT replicate these patterns in modern code.
 */

var TAX_RATE = 0.085;

var calculateTotal = function(items, callback) {
  var total = 0;

  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price * items[i].qty;
  }

  // BUG: Only checks taxable flag on the FIRST item,
  // not on each individual item. This means if item[0]
  // is tax-exempt, ALL items are treated as tax-exempt.
  if (items[0].taxable !== false) {
    total = total + (total * TAX_RATE);
  }

  // BUG: Math.round(1.005 * 100) = 100, not 101
  // Floating-point precision error causes penny-off rounding
  total = Math.round(total * 100) / 100;

  callback(null, total);
};

var calculateSubtotal = function(items) {
  var result = 0;
  for (var i = 0; i < items.length; i++) {
    result = result + items[i].price * items[i].qty;
  }
  return result;
};

var formatCurrency = function(amount) {
  // Legacy formatting — does not handle negative or zero correctly
  return '$' + amount.toFixed(2);
};

module.exports = {
  calculateTotal: calculateTotal,
  calculateSubtotal: calculateSubtotal,
  formatCurrency: formatCurrency
};
