const uuid = require('uuid');
const mongoose = require('mongoose');
const transtormIdFormat = require('../../utils/helpers');

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
    collection: 'users',
    versionKey: false
  }
);

userSchema.method('toClient', transtormIdFormat);

module.exports = mongoose.model('User', userSchema);
