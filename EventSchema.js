const mongoose = require('mongoose');
const User = require('./UserSchema')

const eventSchema = new mongoose.Schema({
    title: { 
      type: String,
      required: true 
    },
    description: { 
      type: String ,
      required: fasle
  },
    date: { 
      type: Date, 
      required: true 
  },
    location: { 
      type: String,
      required: true 
  },
    category: { 
      type: String, 
      required: true },

    image: { 
      type: String ,
      required:flase }, 

    ticketPrice: { 
      type: Number, 
      required: true },

    totalTickets: { 
      type: Number, 
      required: true },

    remainingTickets: { 
      type: Number, 
      required: true },

    Creator: {
      type: User, 
      required: true},

    Timestamp: {
      type: Date, 
      default:Date.now}
});

const Event = mongoose.mode('Event',eventSchema)
module.exports = Event;