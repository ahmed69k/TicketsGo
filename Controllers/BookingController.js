const bookingModel = require('../Models/BookingSchema');
const eventModel = require('../Models/EventSchema');
require('dotenv').config();
const mongoose = require('mongoose');

const bookingController = {

  createBooking : async (req, res) => {
    try {
      const userId = req.user.userId;
      const { eventId, numOfTickets } = req.body;
  
      const event = await eventModel.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found'});
      }
  
      if (event.remainingTickets < numOfTickets) {
        return res.status(400).json({ message: 'Not enough tickets available' });
      }
  
      const totalPrice = numOfTickets * event.ticketPrice;
  
      event.remainingTickets -= numOfTickets;
      await event.save();
  
      const newBooking = new bookingModel({
        bookedTicket: [{ bookingUser: userId, bookingEvent: eventId }],
        numOfTickets,
        totalPrice,
        status: 'Confirmed',
      });
  
      await newBooking.save();
  
      return res.status(201).json({
        message: 'Booking successful',
        booking: newBooking,
      });
    } catch (error) {
      console.error('Booking Error:', error);
      res.status(500).json({ message: 'Server Error while booking' });
    }
},
    getBookingDetails: async (req, res) => {
      try {
        const bookingId = req.params.id;
        const userId = req.user.userId;
  
        const bookingDetails = await bookingModel.findOne({
          _id: bookingId,
          "bookedTicket.bookingUser": userId,
        });
  
        if (!bookingDetails) {
          return res.status(404).json({ message: "Booking not found or unauthorized" });
        }
  
        return res.status(200).json(bookingDetails);
      } catch (e) {
        console.error("System Error:", e);
        res.status(500).json({ message: "Internal Server Error" });
      }
    },

    getUserBookings: async (req, res) => {
      try {
        const userId = req.user.userId;
    
        const bookings = await bookingModel.find({
          "bookedTicket.bookingUser": userId
        });
    
        return res.status(200).json(bookings);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    },

    
    cancelBooking: async (req, res) => {
      const session = await mongoose.startSession();
      session.startTransaction();
  
      try {
        const bookingId = req.params.id;
        const userId = req.user.userId;
  
        const booking = await bookingModel.findOne({
          _id: bookingId,
          "bookedTicket.bookingUser": userId,
        });
  
        if (!booking) {
          return res.status(404).json({ message: "Booking not found or unauthorized" });
        }
  
        const event = await eventModel.findById(booking.bookedTicket[0].bookingEvent);
        if (!event) {
          return res.status(404).json({ message: "Event not found" });
        }
  
        event.remainingTickets += booking.numOfTickets;
        await event.save({ session });
  
        await bookingModel.deleteOne({ _id: bookingId });
  
        await session.commitTransaction();
        session.endSession();
  
        return res.status(200).json({
          message: 'Booking canceled successfully',
          eventId: event._id,
          newRemainingTickets: event.remainingTickets,
        });
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Cancellation Error:', error);
        res.status(500).json({ message: 'Server Error while canceling booking' });
      }
    }
  };

module.exports = bookingController;


