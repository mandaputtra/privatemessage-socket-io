const mongoose = require('mongoose');

let ChatSchema = mongoose.Schema({
  user_a: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user_b: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: [{
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    type: { type: String }
  }]
})

module.exports = mongoose.model('Chat', ChatSchema);
