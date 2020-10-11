const {
  updateEntity,
  createEntity,
  getAllEntities,
  getEntity,
  removeEntity
} = require('../../common/DB');
const { TABLE_BOARD } = require('../../common/constants');

const getAll = async () => getAllEntities(TABLE_BOARD);

const get = async id => getEntity(TABLE_BOARD, id);

const create = async board => {
  createEntity(TABLE_BOARD, board);
  return getEntity(TABLE_BOARD, board.id);
};

const remove = async id => {
  const board = await removeEntity(TABLE_BOARD, id);
  return board;
};

const update = async (id, data) => {
  updateEntity(TABLE_BOARD, id, data);
  return get(id);
};

module.exports = { create, getAll, get, remove, update };
