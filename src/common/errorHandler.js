const { logger } = require('./logging');
class NotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message);
    this.status = '404';
  }
}

const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err instanceof NotFoundError) {
    res.status(err.status).send(err.message);
  } else {
    logger.error(err.stack);
    res.sendStatus(500);
  }
  next();
};

module.exports = {
  errorHandler,
  NotFoundError
};
