const express = require("express");
const bookingController = require("../Controllers/BookingController");
const authorizationMiddleware = require('../Middleware/AuthorizationMiddleware');
const authenticationMiddleware = require('../Middleware/AuthenticationMiddleware');

const router = express.Router();

// * Get current user’s bookings

// * Book tickets for an event 
router.post('/',authenticationMiddleware,authorizationMiddleware(["Standard User"]),bookingController.createBooking);

// * Get booking details by ID
router.get('/:id',authenticationMiddleware,authorizationMiddleware(["Standard User"]),bookingController.getBookingDetails);

// * Cancel a booking   
router.delete('/:id',authenticationMiddleware,authorizationMiddleware(["Standard User"]),bookingController.cancelBooking);
  

module.exports = router;
