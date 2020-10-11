const usersRepo = require('./user.memory.repository');

const create = user => usersRepo.create(user);

const get = id => usersRepo.get(id);

const getAll = () => usersRepo.getAll();

const remove = id => usersRepo.remove(id);

const update = (id, data) => usersRepo.update(id, data);

module.exports = { create, getAll, get, remove, update };
