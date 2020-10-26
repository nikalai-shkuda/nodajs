const uuid = require('uuid');
const mongoose = require('mongoose');
const transtormIdFormat = require('../../utils/helpers');

const taskSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    boardId: {
      type: String,
      default: null
    },
    columnId: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: 'description'
    },
    order: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: 'TASK'
    },
    userId: {
      type: String,
      default: null
    }
  },
  {
    collection: 'tasks',
    versionKey: false
  }
);

taskSchema.method('toClient', transtormIdFormat);

module.exports = mongoose.model('Task', taskSchema);
