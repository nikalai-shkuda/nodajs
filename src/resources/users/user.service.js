const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/task.service');

const create = user => usersRepo.create(user);

const get = id => usersRepo.get(id);

const getAll = () => usersRepo.getAll();

const remove = async id => {
  const user = await usersRepo.remove(id);
  const tasks = await taskService.getAll();
  const formatTasks = tasks.map(task => task.toClient());

  formatTasks.forEach(task => {
    if (task.userId === id) {
      task.userId = null;
      taskService.update(task.id, task);
    }
  });

  return user;
};

const update = (id, data) => usersRepo.update(id, data);

module.exports = { create, getAll, get, remove, update };
