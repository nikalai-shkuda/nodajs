const {
  updateEntity,
  createEntity,
  getAllEntities,
  getEntity,
  removeEntity
} = require('../../common/DB');
const { TABLE_TASKS } = require('../../common/constants');
const { NotFoundError } = require('../../common/errorHandler');

const getAll = async () => getAllEntities(TABLE_TASKS);

const get = async id => {
  const task = await getEntity(TABLE_TASKS, id);

  if (!task) {
    throw new NotFoundError(`Couldn't find a task with id ${id}`);
  }

  return task;
};

const create = async task => {
  createEntity(TABLE_TASKS, task);
  return getEntity(TABLE_TASKS, task.id);
};

const remove = async id => {
  const task = await removeEntity(TABLE_TASKS, id);

  if (!task) {
    throw new NotFoundError(`Couldn't find a task with id: ${id}`);
  }
  return task;
};

const update = async (id, data) => {
  updateEntity(TABLE_TASKS, id, data);
  return get(id);
};

module.exports = { create, getAll, get, remove, update };
