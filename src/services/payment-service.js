/**
 * Payment service — handles totals, tax, and discounts.
 */

const TAX_RATE = 0.085;

/**
 * Calculates the total for an array of items, including tax on taxable items.
 * Uses Number.EPSILON-aware rounding to avoid floating-point penny errors.
 * @param {Array<{price: number, qty: number, taxable?: boolean}>} items
 * @returns {number} The rounded total.
 */
function calculateTotal(items) {
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.price * item.qty);
  }, 0);

  const taxableItems = items.filter(item => item.taxable !== false);
  const tax = taxableItems.reduce((sum, item) => {
    return sum + (item.price * item.qty * TAX_RATE);
  }, 0);

  return Math.round((subtotal + tax + Number.EPSILON) * 100) / 100;
}

/**
 * Applies a discount percentage to a total.
 * @param {number} total - The original total.
 * @param {number} discountPercent - The discount percentage (0-100).
 * @returns {{ valid: boolean, result?: number, reason?: string }}
 */
function applyDiscount(total, discountPercent) {
  if (!Number.isFinite(total) || total < 0) {
    return { valid: false, reason: 'total must be a non-negative finite number' };
  }
  if (!Number.isFinite(discountPercent)) {
    return { valid: false, reason: 'discount must be a finite number' };
  }
  if (discountPercent < 0) {
    return { valid: false, reason: 'discount must not be negative' };
  }
  if (discountPercent > 100) {
    return { valid: false, reason: 'discount must not exceed 100%' };
  }

  const result = Math.round((total - (total * discountPercent / 100) + Number.EPSILON) * 100) / 100;
  return { valid: true, result };
}

module.exports = { calculateTotal, applyDiscount };
