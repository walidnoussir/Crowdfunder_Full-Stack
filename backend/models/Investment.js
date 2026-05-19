const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  investor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model('Investment', investmentSchema);