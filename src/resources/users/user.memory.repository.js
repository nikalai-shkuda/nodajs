const {
  updateEntity,
  createEntity,
  getAllEntities,
  getEntity,
  removeEntity
} = require('../../common/DB');
const { TABLE_USERS } = require('../../common/constants');

const getAll = async () => getAllEntities(TABLE_USERS);

const get = async id => getEntity(TABLE_USERS, id);

const create = async user => {
  createEntity(TABLE_USERS, user);
  return getEntity(TABLE_USERS, user.id);
};

const remove = async id => {
  const user = await removeEntity(TABLE_USERS, id);
  return user;
};

const update = async (id, data) => {
  updateEntity(TABLE_USERS, id, data);
  return get(id);
};

module.exports = { create, getAll, get, remove, update };
