const router = require('express').Router();
const { signToken } = require('./auth.service');

router.post('/', async (req, res) => {
  const { login, password } = req.body;
  const token = await signToken(login, password);

  if (token) {
    res.status(200).json({ token });
  } else {
    res.status(403).send('Wrong login/password!');
  }
});

module.exports = router;
