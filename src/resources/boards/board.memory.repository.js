const {
  updateEntity,
  createEntity,
  getAllEntities,
  getEntity,
  removeEntity
} = require('../../common/DB');
const { TABLE_BOARD } = require('../../common/constants');
const { NotFoundError } = require('../../common/errorHandler');

const getAll = async () => getAllEntities(TABLE_BOARD);

const get = async id => {
  const board = await getEntity(TABLE_BOARD, id);

  if (!board) {
    throw new NotFoundError(`Couldn't find a board with id: ${id}`);
  }

  return board;
};

const create = async board => {
  createEntity(TABLE_BOARD, board);
  return getEntity(TABLE_BOARD, board.id);
};

const remove = async id => {
  const board = await removeEntity(TABLE_BOARD, id);
  if (!board) {
    throw new NotFoundError(`Couldn't find a board with id: ${id}`);
  }
  return board;
};

const update = async (id, data) => {
  const board = await updateEntity(TABLE_BOARD, id, data);

  if (!board) {
    throw new NotFoundError(`Couldn't find a board with id: ${id}`);
  }

  return get(id);
};

module.exports = { create, getAll, get, remove, update };
