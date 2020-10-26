const Task = require('./task.model');
const { NotFoundError } = require('../../common/errorHandler');

const getAll = async () => {
  const task = await Task.find();

  if (!task) {
    throw new NotFoundError("Couldn't find a tasks");
  }

  return task;
};

const get = async id => {
  const task = await Task.findById(id);

  if (!task) {
    throw new NotFoundError(`Couldn't find a task with id: ${id}`);
  }

  return task;
};

const create = async task => {
  const response = await Task.create(task);
  return response;
};

const remove = async id => {
  const status = (await Task.deleteOne({ _id: id })).ok;

  if (!status) {
    throw new NotFoundError(`Couldn't find a task with id: ${id}`);
  }
  return status;
};

const removeByBoardId = async boardId => await Task.deleteMany({ boardId });

const update = async (id, data) => {
  const updatedTask = (await Task.updateOne({ _id: id }, data)).ok;

  if (!updatedTask) {
    throw new NotFoundError(`Couldn't find a task with id: ${id}`);
  }

  return get(id);
};

const updateMany = async (filter, updates) => Task.updateMany(filter, updates);

module.exports = {
  create,
  getAll,
  get,
  remove,
  removeByBoardId,
  update,
  updateMany
};
