const path = require('path');
const morgan = require('morgan');
const { createLogger, format, transports } = require('winston');
const {
  cli,
  colorize,
  combine,
  json,
  prettyPrint,
  simple,
  timestamp,
  uncolorize
} = format;

const formatCustom = combine(json(), prettyPrint(), timestamp(), uncolorize());

const getLogsFolder = file => path.resolve(__dirname, '../../logs', file);

const logger = createLogger({
  level: 'silly',
  format: combine(colorize(), cli()),
  transports: [
    new transports.File({
      filename: getLogsFolder('error.log'),
      format: formatCustom,
      level: 'error'
    }),
    new transports.File({
      filename: getLogsFolder('info.log'),
      format: formatCustom,
      level: 'info',
      handleExceptions: true
    })
  ],
  exceptionHandlers: [
    new transports.File({
      filename: getLogsFolder('exceptions.log'),
      format: formatCustom,
      level: 'error',
      handleExceptions: true
    })
  ],
  exitOnError: true
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: simple(),
      handleExceptions: true
    })
  );
}

logger.stream = {
  write: message => {
    const statusCode = message.substring(
      message.indexOf('[') + 1,
      message.indexOf(']')
    );

    return ['4', '5'].includes(statusCode[0])
      ? logger.error(message)
      : logger.info(message);
  }
};

morgan.token('body', req => JSON.stringify(req.body));
morgan.token('query', req => JSON.stringify(req.query));

const morganOptions = {
  params:
    ':method [:status] :url Query: :query Body: :body - :response-time ms',
  options: {
    stream: logger.stream
  }
};

module.exports = {
  logger,
  morganOptions
};
