const express = require("express");
const userController = require("../Controllers/UserController");
const authorizationMiddleware = require('../Middleware/AuthorizationMiddleware');
const authenticationMiddleware = require('../Middleware/AuthenticationMiddleware');


const router = express.Router();

// * register
router.post("/api/v1/register", userController.register);

// * login
router.post("/api/v1/login", userController.login);

// * get all users
router.get("/api/v1/users",authenticationMiddleware,authorizationMiddleware(['System Admin']),userController.getAllUsers);
  
// * Get current user
router.get("/api/v1/users/profile",authenticationMiddleware,authorizationMiddleware(['Standard User', 'Organizer', 'System Admin']), userController.getCurrentUser);

// * Update user info by the user
router.put("/api/v1/users/profile",authenticationMiddleware,authorizationMiddleware(['Standard User']), userController.updateCurrentUser);

// * Update user role by admin
router.put("/api/v1/users/:id",authenticationMiddleware,authorizationMiddleware(['System Admin']), userController.updateAdminUser);

// * Delete a user
router.delete("/api/v1/users/:id",authenticationMiddleware,authorizationMiddleware(['System Admin']), userController.deleteUser);

// * Get a user by ID
router.get("/api/v1/users/:id",authenticationMiddleware,authorizationMiddleware(['System Admin']), userController.getUser);

module.exports = router; 
