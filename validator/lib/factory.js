const validatorWith = require('./validator');
const nonPositiveValidationRule = require('./rules/nonPositive');
const nonDivisibleValidationrule = require('./rules/nonDivisible');

const ruleFactoryMap = {
  nonPositive: function() {
    return nonPositiveValidationRule;
  },
  nonDivisible: function(options) {
    return nonDivisibleValidationrule(options.divisor, options.error);
  }
};

function toValidatorRule(ruleDescription) {
  return ruleFactoryMap[ruleDescription.type](ruleDescription.options);
};

module.exports = function (findConfiguration) {
  return function (ruleSetName) {
    return validatorWith(findConfiguration(ruleSetName).map(toValidatorRule));
  };
};