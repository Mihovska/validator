const chai = require('chai');
const validatorWith = require('../lib/validator');
nonPositiveValidationRule = require('../lib/rules/nonPositive');
nonDivisibleValidationRule = require('../lib/rules/nonDivisible');

const expect = chai.expect;

describe('A Validation', () => {
  let validator;

  context('using the default validation rules:', () => {
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

    context('for not strictly positive numbers:', () => {
      it('like 0, will include error.nonpositive', () => {
        expect(validator(0)).to.be.include('error.nonpositive');
      });
      it('like -2, will include error.nonpositive', () => {
        expect(validator(-2)).to.be.include('error.nonpositive');
      });
    });

    context('for numbers divisible by 3', () => {
      it('like 3, will include error.three', () => {
        expect(validator(3)).to.be.include('error.three');
      });
      it('like 15, will include error.three', () => {
        expect(validator(15)).to.be.include('error.three');
      });
    });
    context('for numbers divisible by 5:', () => {
      it('like 5, will include error.five', () => {
        expect(validator(5)).to.be.include('error.five');
      });
      it('like 15, will include error.five', () => {
        expect(validator(15)).to.be.include('error.five');
      });
    });
  });
});
