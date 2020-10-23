const { NotFoundError } = require('../../common/errorHandler');
const Board = require('./board.model');

const getAll = async () => {
  const boards = await Board.find({});

  if (!boards) {
    throw new NotFoundError("Couldn't find a boards");
  }
  return boards;
};

const get = async id => {
  const board = await Board.findById(id);

  if (!board) {
    throw new NotFoundError(`Couldn't find a board with id: ${id}`);
  }

  return board;
};

const create = async board => {
  const response = await Board.create(board);
  return response;
};

const remove = async id => {
  const status = (await Board.deleteOne({ _id: id })).ok;
  if (!status) {
    throw new NotFoundError(`Couldn't find a board with id: ${id}`);
  }
  return status;
};

const update = async (id, data) => {
  const updatedBoard = (await Board.updateOne({ _id: id }, data)).ok;

  if (!updatedBoard) {
    throw new NotFoundError(`Couldn't find a board with id: ${id}`);
  }

  return get(id);
};

module.exports = { create, getAll, get, remove, update };
