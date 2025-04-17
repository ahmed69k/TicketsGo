const express = require("express");
const bookingController = require("../Controllers/BookingController");
const authorizationMiddleware = require('../Middleware/AuthorizationMiddleware');
const authenticationMiddleware = require('../Middleware/AuthenticationMiddleware');

const router = express.Router();

router.post(
  '/createBooking',authenticationMiddleware,authorizationMiddleware(["Standard User"]),bookingController.createBooking);

router.get(
  '/bookingDetails/:id',authenticationMiddleware,authorizationMiddleware(["Standard User"]),bookingController.getBookingDetails);


  

module.exports = router;
