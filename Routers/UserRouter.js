const express = require("express");
const userController = require("../Controllers/UserController");
const authorizationMiddleware = require('../Middleware/AuthorizationMiddleware');
const authenticationMiddleware = require('../Middleware/AuthenticationMiddleware');
const bookingController = require("../Controllers/BookingController");


const router = express.Router();

// * forgot password $
router.get("/forgot-password", userController.forgetPassword);

// * reset password $
router.put("/reset-password", userController.resetPassword);

// * register $
router.post("/register", userController.register);

// * login $
router.post("/login", userController.login);

// * get all users $
router.get("/users",authenticationMiddleware,authorizationMiddleware(['System Admin']),userController.getAllUsers);
  
// * Get current user $
router.get("/users/profile",authenticationMiddleware,authorizationMiddleware(['Standard User', 'Organizer', 'System Admin']), userController.getCurrentUser);

// * Update user info by the user $
router.put("/users/profile",authenticationMiddleware,authorizationMiddleware(['Standard User', 'Organizer', 'System Admin']), userController.updateCurrentUser);

// * Update user role by admin $
router.put("/users/:id",authenticationMiddleware,authorizationMiddleware(['System Admin']), userController.updateAdminUser);

// * Delete a user $
router.delete("/users/:id",authenticationMiddleware,authorizationMiddleware(['System Admin']), userController.deleteUser);

// * Get current user’s bookings
router.get("/users/bookings",authenticationMiddleware,authorizationMiddleware(['Standard User']),bookingController.getUserBookings);

// * Get current user’s events
router.get("/users/events", authenticationMiddleware, authorizationMiddleware(['Organizer']), userController.getMyEvents);

// * Get a user by ID
router.get("/users/:id",authenticationMiddleware,authorizationMiddleware(['System Admin']), userController.getUser);





module.exports = router; 
