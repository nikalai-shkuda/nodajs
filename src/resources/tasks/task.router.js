const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.get('/', async (req, res) => {
  const tasks = await tasksService.getAll();
  res.json(tasks.map(task => task.toClient()));
});

router.post('/', async (req, res) => {
  const task = await tasksService.create(
    new Task({
      ...req.body,
      boardId: req.params.boardId
    })
  );
  res.status(200).json(task.toClient());
});

router.get('/:id', async (req, res) => {
  const task = await tasksService.get(req.params.id);
  res.status(200).json(task.toClient());
});

router.put('/:id', async (req, res) => {
  const task = await tasksService.update(req.params.id, req.body);
  res.status(200).json(task.toClient());
});

router.delete('/:id', async (req, res) => {
  await tasksService.remove(req.params.id);
  res.status(200).json(`Task ${req.params.id} deleted successfully`);
});

module.exports = router;
