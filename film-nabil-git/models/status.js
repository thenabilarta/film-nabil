const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = mongoose.Schema({
  content: {type: String},
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {type: String},
});

const Status = mongoose.model('Status', statusSchema);

module.exports = {Status};
