const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');
const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const boards = [new Board()];
const users = [new User(), new User(), new User()];
const tasks = [
  new Task({ boardId: boards[0].id, userId: users[0].id }),
  new Task({ boardId: boards[0].id, userId: users[1].id })
];

module.exports.connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    db.dropDatabase();
    [boards, tasks, users].flat().forEach(el => el.save());
    cb();
  });
};
