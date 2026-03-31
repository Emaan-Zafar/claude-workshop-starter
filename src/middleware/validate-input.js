/**
 * Input validation middleware.
 *
 * Reusable helpers that reject NaN, Infinity, empty strings, arrays,
 * "null" strings, hex notation, negative prices, and other edge cases
 * before they reach route handlers.
 */

/**
 * Validates that a value is a finite, numeric scalar.
 * Rejects: NaN, Infinity, -Infinity, empty strings, non-numeric strings,
 * arrays, "null", hex notation (0x...), and non-finite results.
 * @param {*} value - The raw value to validate (typically from query params).
 * @returns {{ valid: boolean, reason?: string }}
 */
function validateNumericInput(value) {
  if (value === undefined || value === null || value === '') {
    return { valid: false, reason: 'value is required' };
  }

  if (Array.isArray(value)) {
    return { valid: false, reason: 'arrays are not allowed' };
  }

  const str = String(value).trim();

  if (str === 'null' || str === 'undefined') {
    return { valid: false, reason: `"${str}" is not a valid number` };
  }

  if (/^0x/i.test(str)) {
    return { valid: false, reason: 'hex notation is not allowed' };
  }

  const num = Number(str);

  if (!Number.isFinite(num)) {
    return { valid: false, reason: 'value must be a finite number' };
  }

  return { valid: true };
}

/**
 * Validates an array of payment items.
 * Each item must have a finite non-negative price and a finite positive qty.
 * @param {Array} items - The items array from the request body.
 * @returns {{ valid: boolean, reason?: string }}
 */
function validatePaymentItems(items) {
  if (!items || !Array.isArray(items)) {
    return { valid: false, reason: 'items array is required' };
  }

  if (items.length === 0) {
    return { valid: false, reason: 'items array must not be empty' };
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (item.price === undefined || item.price === null) {
      return { valid: false, reason: `item ${i}: price is required` };
    }
    if (typeof item.price !== 'number' || !Number.isFinite(item.price)) {
      return { valid: false, reason: `item ${i}: price must be a finite number` };
    }
    if (item.price < 0) {
      return { valid: false, reason: `item ${i}: price must not be negative` };
    }

    if (item.qty === undefined || item.qty === null) {
      return { valid: false, reason: `item ${i}: qty is required` };
    }
    if (typeof item.qty !== 'number' || !Number.isFinite(item.qty)) {
      return { valid: false, reason: `item ${i}: qty must be a finite number` };
    }
    if (item.qty <= 0) {
      return { valid: false, reason: `item ${i}: qty must be positive` };
    }
  }

  return { valid: true };
}

module.exports = { validateNumericInput, validatePaymentItems };
