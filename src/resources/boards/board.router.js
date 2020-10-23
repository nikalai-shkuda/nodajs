const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(board => board.toClient()));
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(new Board({ ...req.body }));
  res.status(200).json(board.toClient());
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.get(req.params.id);
  res.status(200).json(board.toClient());
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(req.params.id, req.body);
  res.status(200).json(board.toClient());
});

router.route('/:id').delete(async (req, res) => {
  await boardsService.remove(req.params.id);
  res.status(200).json(`Board ${req.params.id} deleted successfully`);
});

module.exports = router;
