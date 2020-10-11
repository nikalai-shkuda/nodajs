const User = require('../resources/users/user.model');
const { TABLE_BOARD } = require('../common/constants');

const initialUsers = [
  new User({ name: '1', login: 'aaa', password: 'sss' }),
  new User({ name: '2', login: '2sdvsd', password: 'dsdgsdgsd' }),
  new User({ name: '3', login: '22sdgsdg', password: '3ddddd3' })
];

const DB = {
  users: [...initialUsers],
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

const getUser = id => DB.users.find(user => user.id === id);

const getAllUsers = () => DB.users || [];

const createUser = user => {
  DB.users.push(user);
  return user;
};

const removeUser = id => {
  const user = getUser(id);
  if (user) {
    DB.users.splice(DB.users.indexOf(user), 1);
  }
  return user;
};

const updateUser = (id, data) => {
  const user = getUser(id);
  if (user) {
    DB.users[DB.users.indexOf(user)] = { ...user, ...data };
  }
  return getUser(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  removeUser,
  updateUser,
  createEntity,
  getEntity,
  getAllEntities,
  removeEntity,
  updateEntity
};
