const {
  updateEntity,
  createEntity,
  getAllEntities,
  getEntity,
  removeEntity
} = require('../../common/DB');
const { TABLE_TASKS } = require('../../common/constants');

const getAll = async () => getAllEntities(TABLE_TASKS);

const get = async id => getEntity(TABLE_TASKS, id);

const create = async task => {
  createEntity(TABLE_TASKS, task);
  return getEntity(TABLE_TASKS, task.id);
};

const remove = async id => {
  const task = await removeEntity(TABLE_TASKS, id);

  if (!task) {
    throw new Error(`Couldn't find a task with id: ${id}`);
  }
};

const update = async (id, data) => {
  updateEntity(TABLE_TASKS, id, data);
  return get(id);
};

module.exports = { create, getAll, get, remove, update };
