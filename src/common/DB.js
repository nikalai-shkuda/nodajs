const User = require('../resources/users/user.model');

const initialUsers = [
  new User({ name: '1', login: 'aaa', password: 'sss' }),
  new User({ name: '2', login: '2sdvsd', password: 'dsdgsdgsd' }),
  new User({ name: '3', login: '22sdgsdg', password: '3ddddd3' })
];

const DB = {
  users: [...initialUsers]
};

const getUser = id => DB.users.find(user => user.id === id);

const getAllUsers = () => DB.users || [];

const createUser = user => {
  DB.users.push(user);
  return user;
};

const removeUser = id => {
  const user = getUser(id);
  if (user) {
    DB.users.splice(DB.users.indexOf(user), 1);
  }
  return user;
};

const updateUser = (id, data) => {
  const user = getUser(id);
  if (user) {
    DB.users[DB.users.indexOf(user)] = { ...user, ...data };
  }
  return getUser(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  removeUser,
  updateUser
};
