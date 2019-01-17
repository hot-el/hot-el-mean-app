const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    required: true,
    enum: ['Waiter', 'Cleaner', 'Manager', 'Receptionist']
  },
  title: {
      type: String,
      required: true
  },
  color: {
      primary: {
          type: String,
          required: true
      },
      secondary: {
          type: String,
          required: true
      }
  },
  from: {
    type: Number,
    required: true
  },
  to: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('Shift', ShiftSchema);
