const bookingModel=require('../Models/BookingSchema')
const eventModel=require('../Models/EventSchema')
require ('dotenv').config()
const mongoose = require('mongoose')


const bookingController = {
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
    }
  };

module.exports = bookingController;

