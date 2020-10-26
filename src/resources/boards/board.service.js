const boardsRepo = require('./board.memory.repository');
const { removeByBoardId } = require('../tasks/task.memory.repository');

const create = board => boardsRepo.create(board);

const get = id => boardsRepo.get(id);

const getAll = () => boardsRepo.getAll();

const remove = async id => {
  await boardsRepo.remove(id);
  await removeByBoardId(id);
};

const update = (id, data) => boardsRepo.update(id, data);

module.exports = { create, getAll, get, remove, update };
