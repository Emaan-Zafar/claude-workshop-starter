/**
 * LEGACY TAX RULES
 * Ported from PowerBuilder stored procedure: sp_calculate_tax
 * Last updated: 2019-06-22
 *
 * This file contains hardcoded tax rates and spaghetti conditional logic.
 * In the modern system, tax rules should come from a configuration file
 * or database, not be hardcoded.
 */

var getTaxRate = function(stateCode, itemCategory) {
  // BUG: Missing states will return undefined, not 0
  // This causes NaN in downstream calculations

  if (stateCode === 'CA') {
    if (itemCategory === 'food') return 0.0;
    if (itemCategory === 'clothing') return 0.0725;
    if (itemCategory === 'electronics') return 0.085;
    if (itemCategory === 'software') return 0.085;
    return 0.085;
  }

  if (stateCode === 'TX') {
    if (itemCategory === 'food') return 0.0;
    if (itemCategory === 'clothing') return 0.0625;
    return 0.0625;
  }

  if (stateCode === 'NY') {
    if (itemCategory === 'clothing' && arguments[2] < 110) return 0.0;
    if (itemCategory === 'food') return 0.0;
    return 0.08;
  }

  if (stateCode === 'OR') {
    return 0.0; // Oregon has no sales tax
  }

  if (stateCode === 'WA') {
    return 0.065;
  }

  // Falls through with undefined for any other state
};

var isExempt = function(item) {
  // Legacy exemption logic — checks both string and boolean
  if (item.exempt === true) return true;
  if (item.exempt === 'yes') return true;
  if (item.exempt === 'Y') return true;
  if (item.taxable === false) return true;
  return false;
};

module.exports = {
  getTaxRate: getTaxRate,
  isExempt: isExempt
};
