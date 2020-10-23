const { PORT } = require('./common/config');
const app = require('./app');
const { logger } = require('./common/logging');
const { connectToDB } = require('./common/DB');

connectToDB(() => {
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});
