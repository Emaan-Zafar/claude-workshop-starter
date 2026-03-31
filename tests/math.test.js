const { add, subtract, multiply, divide } = require('../src/services/math-utils');
const { validateNumericInput } = require('../src/middleware/validate-input');

console.log('  Math Utils Tests:');

assert(add(2, 3) === 5, 'add(2, 3) should equal 5');
assert(add(-1, 1) === 0, 'add(-1, 1) should equal 0');
assert(add(0, 0) === 0, 'add(0, 0) should equal 0');

assert(subtract(10, 4) === 6, 'subtract(10, 4) should equal 6');
assert(subtract(0, 5) === -5, 'subtract(0, 5) should equal -5');

assert(multiply(3, 4) === 12, 'multiply(3, 4) should equal 12');
assert(multiply(0, 100) === 0, 'multiply(0, 100) should equal 0');

assert(divide(10, 2) === 5, 'divide(10, 2) should equal 5');
assert(divide(7, 2) === 3.5, 'divide(7, 2) should equal 3.5');
assert(divide(0, 5) === 0, 'divide(0, 5) should equal 0');
assert(divide(-10, 2) === -5, 'divide(-10, 2) should equal -5');
assert(divide(10, -2) === -5, 'divide(10, -2) should equal -5');
assert(Number.isFinite(divide(1e154, 1e154)), 'divide(1e154, 1e154) should be finite');

// --- Validation tests ---

console.log('  Input Validation Tests:');

// Division by zero is caught at the route level, but divide() itself returns Infinity
assert(!Number.isFinite(divide(10, 0)), 'divide(10, 0) returns non-finite (caught by route)');

// validateNumericInput rejects bad inputs
assert(validateNumericInput(Infinity).valid === false, 'rejects Infinity');
assert(validateNumericInput(-Infinity).valid === false, 'rejects -Infinity');
assert(validateNumericInput('').valid === false, 'rejects empty string');
assert(validateNumericInput('null').valid === false, 'rejects "null" string');
assert(validateNumericInput('hello').valid === false, 'rejects non-numeric string');
assert(validateNumericInput('0xFF').valid === false, 'rejects hex notation');
assert(validateNumericInput(undefined).valid === false, 'rejects undefined');
assert(validateNumericInput(null).valid === false, 'rejects null');
assert(validateNumericInput([1, 2]).valid === false, 'rejects arrays');
assert(validateNumericInput('NaN').valid === false, 'rejects "NaN" string');

// validateNumericInput accepts valid inputs
assert(validateNumericInput('42').valid === true, 'accepts "42"');
assert(validateNumericInput('3.14').valid === true, 'accepts "3.14"');
assert(validateNumericInput('-7').valid === true, 'accepts "-7"');
assert(validateNumericInput('0').valid === true, 'accepts "0"');
