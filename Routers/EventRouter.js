require('dotenv').config();
const express = require("express");
const eventController = require("../Controllers/EventController");
const authorizationMiddleware = require('../Middleware/AuthorizationMiddleware');
const authenticationMiddleware = require('../Middleware/AuthenticationMiddleware');

const router = express.Router();

// * Create an event
router.post("/", authenticationMiddleware, authorizationMiddleware(['Organizer']), eventController.create);

// * Get all events
router.get("/", eventController.getAllEvents);

// * Get an event by ID
router.get("/:id", eventController.getEvent);

// * Update an event by ID
router.put("/:id", authenticationMiddleware, authorizationMiddleware(['Organizer', 'System Admin']), eventController.updateEvent);

// * Delete an event by ID
router.delete("/:id", authenticationMiddleware, authorizationMiddleware(['Organizer', 'System Admin']), eventController.deleteEvent);

// * Update an event's status
router.put("/:id/status", authenticationMiddleware, authorizationMiddleware(['System Admin']), eventController.updateStatus);

// * Get the analytics of the current user’s events
router.get("/analytics/", authenticationMiddleware, authorizationMiddleware(['Organizer']), eventController.getEventAnalytics);



module.exports = router;