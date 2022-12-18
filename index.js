const mongoose = require('mongoose');
const http = require('http');
const app = require('./src/app');
const config = require('./src/config/config');
const logger = require('./src/config/logger');
const Io = require('./src/socket');

let server;

const httpServer = http.createServer(app);
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  server = httpServer.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
  const socket = new Io(httpServer, config.socketEndpoint);
  socket.getStatistical();
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
