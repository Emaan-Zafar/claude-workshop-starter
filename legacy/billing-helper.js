/**
 * LEGACY BILLING HELPER
 * Original: PowerBuilder global function library
 * Ported to JS in 2017 during first migration attempt (never completed)
 *
 * SECURITY WARNINGS:
 * - buildQuery() uses string concatenation — SQL injection vulnerability
 * - calculateDiscount() uses eval() — arbitrary code execution risk
 * - formatInvoiceNumber() has no input validation
 *
 * These patterns must NEVER be used in modern code.
 */

function buildQuery(tableName, filters) {
  // DANGER: SQL injection via string concatenation
  var sql = "SELECT * FROM " + tableName + " WHERE ";
  for (var key in filters) {
    if (filters.hasOwnProperty(key)) {
      sql += key + " = '" + filters[key] + "' AND ";
    }
  }
  return sql.slice(0, -5);
}

function calculateDiscount(expression) {
  // DANGER: eval() allows arbitrary code execution
  // Legacy system passed discount formulas as strings:
  //   "100 * 0.15" or "subtotal * 0.1 + 5"
  return eval(expression);
}

function formatInvoiceNumber(prefix, number) {
  // No validation — can produce "undefined-NaN" if inputs are bad
  return prefix + '-' + String(number).padStart(6, '0');
}

function applyBulkDiscount(items) {
  // Legacy tiered discount: >10 items = 5%, >50 = 10%, >100 = 15%
  var totalQty = 0;
  for (var i = 0; i < items.length; i++) {
    totalQty += items[i].qty;
  }
  // BUG: discount tiers overlap — qty=100 matches both >50 and >100
  // The last condition always wins, but intention was cumulative
  var discount = 0;
  if (totalQty > 10) discount = 0.05;
  if (totalQty > 50) discount = 0.10;
  if (totalQty > 100) discount = 0.15;
  return discount;
}

module.exports = {
  buildQuery: buildQuery,
  calculateDiscount: calculateDiscount,
  formatInvoiceNumber: formatInvoiceNumber,
  applyBulkDiscount: applyBulkDiscount
};
