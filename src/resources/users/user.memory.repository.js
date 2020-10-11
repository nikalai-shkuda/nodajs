const {
  updateUser,
  createUser,
  getAllUsers,
  getUser,
  removeUser
} = require('../../common/DB');

const getAll = async () => getAllUsers();

const get = async id => getUser(id);

const create = async user => {
  createUser(user);
  return get(user.id);
};

const remove = async id => {
  removeUser(id);
};

const update = async (id, data) => {
  updateUser(id, data);
  return get(id);
};

module.exports = { create, getAll, get, remove, update };
