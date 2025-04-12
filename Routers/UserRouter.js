const express = require("express");
const userController = require("../Controllers/UserController");
const authorizationMiddleware=require('../  Middleware/AuthorizationMiddleware');
const router = express.Router();

// *  register
router.post("/api/v1/register", authorizationMiddleware(['Standard User', 'Organizer', 'System Admin']),userController.register);



// * login
router.post('/api/v1/login', authenticationMiddleware(['Standard User', 'Organizer', 'System Admin']), userController.login);

//*get all users
router.get(" /api/v1/users ", authorizationMiddleware(['Standard User', 'Organizer', 'System Admin']),userController.getAllUsers);


// * Get current user
router.get("/api/v1/users/profile ", authenticationMiddleware(['Standard User', 'Organizer', 'System Admin']),userController.getCurrentUser);


// * Update a user

router.put(" /api/v1/users/profile ",authenticationMiddleware(['Standard User']),userController.updateCurrentUser);

//* Update  user role by admin
router.put("/api/v1/users/:id  ",authorizationMiddleware(['System Admin']),userController.updateAdminUser);

// * Delete a user
router.delete("/api/v1/users/:id ",authorizationMiddleware(['System admin']),userController.deleteUser);

// * Get a user by ID
router.get("/api/v1/users/:id ", authorizationMiddleware(['System admin']), userController.getUser);




module.exports = userRouter; // ! Don't forget to export the router