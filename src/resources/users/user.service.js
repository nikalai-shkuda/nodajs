const usersRepo = require('./user.memory.repository');
const { updateMany } = require('../tasks/task.memory.repository');

const create = user => usersRepo.create(user);

const get = id => usersRepo.get(id);

const getAll = () => usersRepo.getAll();

const remove = async id => {
  await usersRepo.remove(id);
  await updateMany({ userId: id }, { userId: null });
};

const update = (id, data) => usersRepo.update(id, data);

module.exports = { create, getAll, get, remove, update };
