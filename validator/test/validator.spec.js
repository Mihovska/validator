const chai = require('chai');
const factorywithConfiguration = require('../lib/factory');

const expect = chai.expect;

describe('A Validation', () => {
  let validator;
  let configuration;

  context('using the default validation rules:', () => {
    beforeEach(() => {
      configuration = function () {
        configuration.callCount++;
        configuration.args = Array.prototype.slice.call(arguments);
        return [
          { type: 'nonPositive' },
          { type: 'nonDivisible', options: { divisor: 3, error: 'error.three' } },
          { type: 'nonDivisible', options: { divisor: 5, error: 'error.five' } }
        ];
      };
      configuration.callCount = 0;
      const newValidator = factorywithConfiguration(configuration);
      validator = newValidator('default');
    });

    it('will access the configuration to get the validation rules', () => {
      expect(configuration.callCount).to.be.equal(1);
      expect(configuration.args).to.be.deep.equal(['default']);
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
  
  context('using the alternative validation rules:', () => { 
    beforeEach(() => {
      configuration = function () {
        configuration.callCount++;
        configuration.args = Array.prototype.slice.call(arguments);
        return [
          { type: 'nonPositive' },
          { type: 'nonDivisible', options: { divisor: 11, error: 'error.eleven' } }
        ];
      }
      configuration.callCount = 0;
      const newValidator = factorywithConfiguration(configuration)
      validator = newValidator('alternative');
    });

    it('will access the configuration to get the validation rules', () => {
      expect(configuration.callCount).to.be.equal(1);
      expect(configuration.args).to.be.deep.equal(['alternative']);
    });

    context('for numbers divisible by 11:', () => {
      it('like 11, will include error.eleven', () => {
        expect(validator(11)).to.be.include('error.eleven');
      });
      it('like 33, will include error.eleven', () => {
        expect(validator(33)).to.include('error.eleven');
      });
    });
  });
});
