module.exports = function (validationRules) {
  return function (n) {
    return validationRules.reduce((result, rule) => {
      rule(n, result);
      return result;
    }, []);
  };
};