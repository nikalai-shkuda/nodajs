const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  res.json(tasks.map(Task.toResponse));
});

router.route('/').post(async (req, res) => {
  console.log(1, req.params, req.body);
  const task = await tasksService.create(
    new Task({
      ...req.body,
      boardId: req.params.boardId
    })
  );
  res.status(200).json(Task.toResponse(task));
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.get(req.params.id);
  res.status(200).json(Task.toResponse(task));
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.update(req.params.id, req.body);
  res.status(200).json(Task.toResponse(task));
});

router.route('/:id').delete(async (req, res) => {
  await tasksService.remove(req.params.id);
  res.status(200).json(`Task ${req.params.id} deleted successfully`);
});

module.exports = router;
