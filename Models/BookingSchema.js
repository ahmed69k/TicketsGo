const mongoose = require('mongoose');
const User = require('./UserSchema');

const BookingSchema = new mongoose.Schema({
    bookingUser: User
    ,
    event : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
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