const {
  updateEntity,
  createEntity,
  getAllEntities,
  getEntity,
  removeEntity
} = require('../../common/DB');
const { TABLE_USERS } = require('../../common/constants');
const { NotFoundError } = require('../../common/errorHandler');

const getAll = async () => getAllEntities(TABLE_USERS);

const get = async id => {
  const user = await getEntity(TABLE_USERS, id);

  if (!user) {
    throw new NotFoundError(`Couldn't find a user with id: ${id}`);
  }

  return user;
};

const create = async user => {
  createEntity(TABLE_USERS, user);
  return getEntity(TABLE_USERS, user.id);
};

const remove = async id => {
  const user = await removeEntity(TABLE_USERS, id);
  if (!user) {
    throw new NotFoundError(`Couldn't find a user with id: ${id}`);
  }
  return user;
};

const update = async (id, data) => {
  const updatedUser = await updateEntity(TABLE_USERS, id, data);

  if (!updatedUser) {
    throw new NotFoundError(`Couldn't find a user with id: ${id}`);
  }

  return get(id);
};

module.exports = { create, getAll, get, remove, update };
