const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

module.exports = (req, res, next) => {
  if (require.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Unauthorized user!' });
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;

    return next();
  } catch (e) {
    res.status(401).json({ message: 'Unauthorized user!' });
  }
};
