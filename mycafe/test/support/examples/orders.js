const beverage = require('./beverages');

let counter = 0;

function asOrderItem(item) {
  return {
    beverage: beverage[item.beverage](),
    quantity: item.quantity
  };
}

module.exports = {
  empty: function () {
    return {
      id: "<empty order>",
      data: []
    };
  },
  withItems : function (items) {
    counter += 1;
    return {
      id: `<non empty order ${counter}>`,
      data: items.map(asOrderItem)
    };
  },
  actionsFor: function (order) {
    return {
      removeItem: function (index) {
        const item = order.data[index];
        return {
          action: 'remove-beverage',
          target: order.id,
          parameters: {
            beverageRef: item.beverage.id
          }
        };
      },
      editItemQuantity: function (index) {
        const item = order.data[index];
        return {
          action: 'edit-beverage',
          target: order.id,
          parameters: {
            beverageRef: item.beverage.id,
            newQuantity: item.quantity
          }
        };
      },
      appendItem: function () {
        return {
          action: 'append-beverage',
          target: order.id,
          parameters: {
            beverageRef: null,
            quantity: 0
          }
        };
      },
      place: function () {
        return {
          action: 'place-order',
          target: order.id
        };
      }
    };
  }
};