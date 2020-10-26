const uuid = require('uuid');
const mongoose = require('mongoose');
const transtormIdFormat = require('../../utils/helpers');

const boardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    columns: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: 'BOARD'
    }
  },
  {
    collection: 'boards',
    versionKey: false
  }
);

boardSchema.method('toClient', transtormIdFormat);

module.exports = mongoose.model('Board', boardSchema);
