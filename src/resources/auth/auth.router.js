const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const router = require('express').Router();
const User = require('../users/user.model');

router.post('/', async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });

    if (!user) {
      return res.status(403).json({ message: 'This user was not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        login: user.login
      },
      JWT_SECRET_KEY,
      {
        expiresIn: '1h'
      }
    );

    res.status(200).json({ token });
  } catch (e) {
    res.status(500).json({ message: 'Sorry...' });
  }
});

module.exports = router;
