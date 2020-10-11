const tasksRepo = require('./task.memory.repository');

const create = board => tasksRepo.create(board);

const get = id => tasksRepo.get(id);

const getAll = () => tasksRepo.getAll();

const remove = id => tasksRepo.remove(id);

const update = (id, data) => tasksRepo.update(id, data);

module.exports = { create, getAll, get, remove, update };
