const { NotFoundError } = require('../../common/errorHandler');
const User = require('./user.model');

const getAll = async () => {
  const users = await User.find({});

  if (!users) {
    throw new NotFoundError("Couldn't find a users");
  }
  return users;
};

const get = async id => {
  const user = await User.findById(id);

  if (!user) {
    throw new NotFoundError(`Couldn't find a user with id: ${id}`);
  }

  return user;
};

const create = async user => {
  const response = await User.create(user);
  return response;
};

const remove = async id => {
  const status = (await User.deleteOne({ _id: id })).ok;

  if (!status) {
    throw new NotFoundError(`Couldn't find a user with id: ${id}`);
  }
  return status;
};

const update = async (id, data) => {
  const updatedUser = (await User.updateOne({ _id: id }, data)).ok;

  if (!updatedUser) {
    throw new NotFoundError(`Couldn't find a user with id: ${id}`);
  }

  return get(id);
};

module.exports = { create, getAll, get, remove, update };
