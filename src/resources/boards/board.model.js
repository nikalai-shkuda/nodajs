const uuid = require('uuid');
const mongoose = require('mongoose');

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
    versionKey: false
  }
);

function toClient() {
  const obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;

  return obj;
}

boardSchema.method('toClient', toClient);

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
