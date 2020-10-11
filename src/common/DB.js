const User = require('../resources/users/user.model');
const { TABLE_BOARD, TABLE_USERS } = require('../common/constants');

const initialUsers = [
  new User({ name: '1', login: 'aaa', password: 'sss' }),
  new User({ name: '2', login: '2sdvsd', password: 'dsdgsdgsd' }),
  new User({ name: '3', login: '22sdgsdg', password: '3ddddd3' })
];

const DB = {
  [TABLE_USERS]: [...initialUsers],
  [TABLE_BOARD]: []
};

const createEntity = (key, entity) => {
  DB[key].push(entity);
  return entity;
};

const getEntity = (key, id) => DB[key].find(entity => entity.id === id);

const getAllEntities = key => DB[key] || [];

const removeEntity = (key, id) => {
  const entity = getEntity(key, id);
  if (entity) {
    DB[key].splice(DB[key].indexOf(entity), 1);
  }
  return entity;
};

const updateEntity = (key, id, data) => {
  const entity = getEntity(key, id);
  if (entity) {
    DB[key][DB[key].indexOf(entity)] = { ...entity, ...data };
  }
  return getEntity(key, id);
};

module.exports = {
  createEntity,
  getEntity,
  getAllEntities,
  removeEntity,
  updateEntity
};
