const mongoose = require('mongoose');
const User = require('./UserSchema');
const Event = require('./EventSchema');

const bookedTicket = new mongoose.Schema({
    bookingUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookingEvent : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    }});
    

const BookingSchema = new mongoose.Schema({
    bookedTicket: [bookedTicket],
    numOfTickets: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending'
    },
    bookingDate: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;