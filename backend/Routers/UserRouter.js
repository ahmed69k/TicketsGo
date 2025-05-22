const express = require("express");
const userController = require("../Controllers/UserController");
const eventController = require("../Controllers/EventController");
const mongoose = require("mongoose");
const authorizationMiddleware = require('../Middleware/AuthorizationMiddleware');
const authenticationMiddleware = require('../Middleware/AuthenticationMiddleware');
const bookingController = require("../Controllers/BookingController");
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "uploads/");
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + '-' + file.originalname)
    }
})
const upload = multer({storage:storage})


const router = express.Router();

// * forgot password $
router.get("/forgot-password", userController.forgetPassword);

// * reset password $
router.put("/reset-password", userController.resetPassword);

// * register $
router.post("/register",upload.single("profilePicture"), userController.register);

// * login $
router.post("/login", userController.login);

// *MFA
router.post('/verify-otp',userController.verifyOTP)

// * logout
router.post('/logout',userController.logout);

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

// * Get current organizer's events $
router.get("/users/events", authenticationMiddleware, authorizationMiddleware (['Organizer']), userController.getMyEvents);

// * Get a user by ID $
router.get("/users/:id",authenticationMiddleware,authorizationMiddleware(['System Admin']), userController.getUser);

// * Get the analytics of the current user’s events $
router.get("/users/events/analytics/", authenticationMiddleware, authorizationMiddleware(['Organizer']), eventController.getEventAnalytics);





module.exports = router; 
