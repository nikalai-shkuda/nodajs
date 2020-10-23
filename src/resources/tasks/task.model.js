const uuid = require('uuid');
const mongoose = require('mongoose');

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
    versionKey: false
  }
);

function toClient() {
  const obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;

  return obj;
}

taskSchema.method('toClient', toClient);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
