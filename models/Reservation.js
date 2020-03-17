const mongoose = require('mongoose');

const ReservationShema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },

  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'stations'
  },

  date: {
    type: Date,
    default: Date.now
  },

  timeStampFrom: {
    type: String
  },
  timeStampTo: {
    type: String
  }
});

module.exports = mongoose.model('reservation', ReservationShema);
