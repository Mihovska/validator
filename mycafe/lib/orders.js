module.exports = function (entity) {
  return {
    display: function (id, items, actions) {
      const totalPrice = items.map(item => item.beverage.price * item.quantity)
        .reduce((a, b) => a + b, 0);

      return Promise.resolve({
        items,
        totalPrice,
        actions
      })
    }
  }
}