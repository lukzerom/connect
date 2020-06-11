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


  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cars'
  },


  date: {
    type: Date,
    default: Date.now
  },

  timeStampFrom: {
    type: Number
  },
  timeStampTo: {
    type: Number
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  fullPrice: {
    type: Number
  },
  isOwnerAccepted: {
    type: Boolean,
    default: false
  },
  isOwnerRejected: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('reservation', ReservationShema);