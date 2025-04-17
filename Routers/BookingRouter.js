const express = require("express");
const bookingController = require("../Controllers/BookingController");
const authorizationMiddleware = require('../Middleware/AuthorizationMiddleware');
const authenticationMiddleware = require('../Middleware/AuthenticationMiddleware');

const router = express.Router();


router.get(
  '/bookingDetails/:id',authenticationMiddleware,authorizationMiddleware(["Standard User"]),bookingController.getBookingDetails);

router.post(
    '/createBooking',authenticationMiddleware,authorizationMiddleware(["Standard User"]),bookingController.createBooking);
  

module.exports = router;
