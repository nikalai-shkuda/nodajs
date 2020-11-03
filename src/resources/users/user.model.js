const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const { model, Schema } = require('mongoose');
const transtormIdFormat = require('../../utils/helpers');

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    login: {
      type: String,
      default: 'user',
      required: true,
      unique: true
    },
    name: {
      type: String,
      default: 'USER'
    },
    password: {
      type: String,
      default: 'P@55w0rd',
      required: true
    }
  },
  {
    collection: 'users',
    versionKey: false
  }
);

userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.method('toClient', transtormIdFormat);

module.exports = model('User', userSchema);
