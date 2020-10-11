const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/task.service');

const create = user => usersRepo.create(user);

const get = id => usersRepo.get(id);

const getAll = () => usersRepo.getAll();

const remove = async id => {
  const user = await usersRepo.remove(id);
  const tasks = await taskService.getAll();

  tasks.forEach(task => {
    if (task.userId === user.id) {
      taskService.update(task.id, { ...task, userId: null });
    }
  });

  return user;
};

const update = (id, data) => usersRepo.update(id, data);

module.exports = { create, getAll, get, remove, update };
