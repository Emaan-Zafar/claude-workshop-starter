/**
 * Simple test runner — no external dependencies required.
 * Runs all test files and reports pass/fail counts.
 */

let totalPassed = 0;
let totalFailed = 0;
const failures = [];

function assert(condition, testName) {
  if (condition) {
    totalPassed++;
    console.log(`  ✓ ${testName}`);
  } else {
    totalFailed++;
    failures.push(testName);
    console.log(`  ✗ ${testName}`);
  }
}

function assertAlmostEqual(actual, expected, testName, tolerance = 0.01) {
  const pass = Math.abs(actual - expected) < tolerance;
  if (pass) {
    totalPassed++;
    console.log(`  ✓ ${testName}`);
  } else {
    totalFailed++;
    failures.push(`${testName} (expected ${expected}, got ${actual})`);
    console.log(`  ✗ ${testName} (expected ${expected}, got ${actual})`);
  }
}

global.assert = assert;
global.assertAlmostEqual = assertAlmostEqual;

console.log('\n========================================');
console.log('  CLAUDE WORKSHOP STARTER — TEST SUITE');
console.log('========================================\n');

const testFiles = [
  './math.test.js',
  './payments.test.js'
];

for (const file of testFiles) {
  try {
    console.log(`\n📁 ${file}`);
    require(file);
  } catch (err) {
    console.log(`  ✗ LOAD ERROR: ${err.message}`);
    totalFailed++;
    failures.push(`${file}: ${err.message}`);
  }
}

console.log('\n========================================');
console.log(`  RESULTS: ${totalPassed} passed, ${totalFailed} failed`);
if (failures.length > 0) {
  console.log('\n  FAILURES:');
  failures.forEach(f => console.log(`    - ${f}`));
}
console.log('========================================\n');

process.exit(totalFailed > 0 ? 1 : 0);
