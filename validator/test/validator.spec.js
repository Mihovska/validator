const chai = require('chai');
const validatorWith = require('../lib/validator');
nonPositiveValidationRule = require('../lib/rules/nonPositive');
nonDivisibleValidationRule = require('../lib/rules/nonDivisible');

const expect = chai.expect;

function expectedToIncludeErrorWhenInvalid(number, error) {
  it(`like ${number}`, () => {
    expect(validator(number)).to.be.include(error);
  });
};

describe('A Validator', () => {
  let validator;

  beforeEach(() => {
    validator = validatorWith([
      nonPositiveValidationRule,
      nonDivisibleValidationRule(3, 'error.three'),
      nonDivisibleValidationRule(5, 'error.five')
    ]);
  });

  it('will return no errors for valid numbers', () => {
    expect(validator(1)).to.be.empty;
  });

  describe('will include error.nonpositive for not strictly positive numbers', () => {
    it('like 0', () => {
      expect(validator(0)).to.be.include('error.nonpositive');
    });
    it('like -2', () => {
      expect(validator(-2)).to.be.include('error.nonpositive');
    });
  });

  describe('will include error.three for divisible y 3 numbers:', () => {
    it('like 3', () => {
      expect(validator(3)).to.be.include('error.three');
    });
    it('like 15', () => {
      expect(validator(15)).to.be.include('error.three');
    });
  });

  describe('will include error.five for divisible by 5 numbers:', () => {
    it('like 5', () => {
      expect(validator(5)).to.be.include('error.five');
    });
    it('like 15', () => {
      expect(validator(15)).to.be.include('error.five');
    });
  });
});
