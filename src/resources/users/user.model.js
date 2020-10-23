const uuid = require('uuid');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    login: {
      type: String,
      default: 'user'
    },
    name: {
      type: String,
      default: 'USER'
    },
    password: {
      type: String,
      default: 'P@55w0rd'
    }
  },
  {
    versionKey: false
  }
);

userSchema.methods.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
