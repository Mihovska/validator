const sinon = require('sinon');

module.exports = function () {
  const dao = { byId: sinon.stub() };
  let storage = {};

  storage.dao = function () {
    return dao;
  };
  storage.alreadyContains = function (entity) {
    const data = entity.data;
    dao.byId
      .withArgs(entity.id)
      .callsArgWithAsync(1, null, data);
    return entity;
  };
  return storage;
}