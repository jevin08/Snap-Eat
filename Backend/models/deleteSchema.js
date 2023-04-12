const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Schema = mongoose.Schema;

dotenv.config({ path: "backend/config/config.env" });
const deleteSchema = new Schema({
  collection_name: {
    type: String,
    trim: true,
    required: [true, "Please enter collection name"]
  },
  document: {
    type: Schema.Types.Mixed,
    default: {},
  },
  createdAt: {
    type: Date,
    expires: process.env.DELETE_AFTER,
    index: true,
    default: Date.now
  }
},
  {
    collection: 'deleted',
    strict: true
  },
);
module.exports = mongoose.model('Deleted', deleteSchema);