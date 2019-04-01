const chai = require('chai');
const newStorage = require('./support/storageDouble')
const order = require('./support/examples/orders');
const orderSystemWith = require('../lib/orders');

const expect = chai.expect;
chai.use(require("chai-as-promised"));

describe('Customer displays order', () => {
  beforeEach(function () {
    this.orderStorage = newStorage();
    this.orderSystem = orderSystemWith(this.orderStorage.dao());
  });
  context('Given that the order is empty', function () {
    beforeEach(function () {
      this.order = this.orderStorage.alreadyContains(order.empty());
      this.result = this.orderSystem.display(this.order.id, this.order.data);
    });
    it('will show no order items', function () {
      return expect(this.result).to.eventually
        .have.property('items').that.is.empty;
    });
    it('will show 0 as the total price', function () {
      return expect(this.result).to.eventually
        .have.property('totalPrice').that.is.equal(0);
    });
    it('will only be possible to add a beverage', function () {
      return expect(this.result).to.eventually
        .have.property('actions').that.is.deep.equal([{
          action: 'append-beverage',
          target: this.order.id,
          parameters: {
            beverageRef: null,
            quantity: 0
          }
        }]);
    });
  });

  context.only('Given that the order contais beverages', () => {
    beforeEach(function () {
      this.order = this.orderStorage
        .alreadyContains(order.withItems([
          { beverage: 'expresso', quantity: 1 },
          { beverage: 'mocaccino', quantity: 2 }
        ]));
      this.orderActions = order.actionsFor(this.order);
      this.result = this.orderSystem.display(this.order.id, this.order.data, this.orderActions);
    });

    it('will show one item per beverage', function () {
      return expect(this.result).to
        .eventually.have.property('items')
        .that.is.deep.equal(this.order.data);
    });
    it('will show the sum of the unit prices as total price', function () {
      return expect(this.result).to.eventually
        .have.property('totalPrice').that.is.equal(6.10);
    });
    it('will be possible to place the order', function () {
      return expect(this.result).to.eventually
        .have.property('actions')
        .that.include(this.orderActions.place());
    });
    it('will be possible to add beverage', function () {
      return expect(this.result).to.eventually
        .have.property('actions')
        .that.include(this.orderActions.appendItem());
    });
    it('will be possible to remove a beverage', function () {
      return expect(this.result).to.eventually
        .have.property('actions')
        .that.include(this.orderActions.removeItem(0))
        .and.that.include(this.orderActions.removeItem(1));
    });
    it('will be possible to change the quantity of a beverage', function () {
      return expect(this.result).to.eventually
        .have.property('actions')
        .that.include(this.orderActions.editItemQuantity(0))
        .and.that.include(this.orderActions.editItemQuantity(1));
    });
  });

  context('given that the order has pending messages', () => {
    it('will show the pending messages');
    it('there will be no more pending messages');
  });
});
