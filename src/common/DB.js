const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const {
  TABLE_BOARD,
  TABLE_USERS,
  TABLE_TASKS
} = require('../common/constants');

const DB = {
  [TABLE_USERS]: [],
  [TABLE_BOARD]: [],
  [TABLE_TASKS]: []
};

// init DB with mock data
(() => {
  for (let i = 0; i < 4; i++) {
    DB[TABLE_USERS].push(new User());
  }
  const board = new Board();
  DB[TABLE_BOARD].push(board);
  DB[TABLE_TASKS].push(
    new Task({ boardId: board.id, userId: DB[TABLE_USERS][0].id }),
    new Task({ boardId: board.id, userId: DB[TABLE_USERS][2].id })
  );
})();

const createEntity = (key, entity) => {
  DB[key].push(entity);
  return entity;
};

const getEntity = (key, id) => DB[key].find(entity => entity.id === id);

const getAllEntities = key => DB[key] || [];

const removeEntity = (key, id) => {
  const entity = getEntity(key, id);
  if (entity) {
    DB[key].splice(DB[key].indexOf(entity), 1);
  }
  return entity;
};

const updateEntity = (key, id, data) => {
  const entity = getEntity(key, id);
  if (entity) {
    DB[key][DB[key].indexOf(entity)] = { ...entity, ...data };
  }
  return getEntity(key, id);
};

module.exports = {
  createEntity,
  getEntity,
  getAllEntities,
  removeEntity,
  updateEntity
};
