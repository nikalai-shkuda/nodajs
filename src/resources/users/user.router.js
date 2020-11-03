const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.get('/', async (req, res) => {
  const users = await usersService.getAll();
  res.status(OK).json(users.map(user => user.toClient()));
});

router.post('/', async (req, res) => {
  const candidate = await User.findOne({ login: req.body.login });

  if (candidate) {
    return res.status(400).json({ message: 'This user already exists' });
  }

  const user = await usersService.create(new User({ ...req.body }));
  res.status(OK).json(user.toClient());
});

router.get('/:id', async (req, res) => {
  const user = await usersService.get(req.params.id);
  res.status(OK).json(user.toClient());
});

router.put('/:id', async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  res.status(OK).json(user.toClient());
});

router.delete('/:id', async (req, res) => {
  await usersService.remove(req.params.id);
  res.status(NO_CONTENT).json(`User ${req.params.id} deleted successfully`);
});

module.exports = router;
