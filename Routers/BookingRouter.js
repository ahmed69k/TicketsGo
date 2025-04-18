const express = require("express");
const bookingController = require("../Controllers/BookingController");
const authorizationMiddleware = require('../Middleware/AuthorizationMiddleware');
const authenticationMiddleware = require('../Middleware/AuthenticationMiddleware');

const router = express.Router();

router.post(
  '/',authenticationMiddleware,authorizationMiddleware(["Standard User"]),bookingController.createBooking);

router.get(
  '/:id',authenticationMiddleware,authorizationMiddleware(["Standard User"]),bookingController.getBookingDetails);

  router.get(
    '/:id/',
    authenticationMiddleware,authorizationMiddleware(["Standard User"]),bookingController.getUserBookings);
  
  router.delete(
    '/:id',
    authenticationMiddleware,authorizationMiddleware(["Standard User"]),bookingController.cancelBooking);
  

module.exports = router;
