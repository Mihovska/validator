const validatorWith = require('./validator');
const nonPositiveValidationRule = require('./rules/nonPositive');
const nonDivisibleValidationrule = require('./rules/nonDivisible');

module.exports = function () {
  return function () {
    return validatorWith([
      nonPositiveValidationRule,
      nonDivisibleValidationrule(3, 'error.three'),
      nonDivisibleValidationrule(5, 'error.five')
    ]);
  };
};