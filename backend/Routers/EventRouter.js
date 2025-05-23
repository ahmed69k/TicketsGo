require('dotenv').config();
const express = require("express");
const eventController = require("../Controllers/EventController");
const authorizationMiddleware = require('../Middleware/AuthorizationMiddleware');
const authenticationMiddleware = require('../Middleware/AuthenticationMiddleware');
const multer = require("multer");
const path = require("path");

const router = express.Router();

// * Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// * Create an event with image upload
router.post(
  "/",
  authenticationMiddleware,
  authorizationMiddleware(['Organizer']),
  upload.single("image"), // <-- This handles image uploads
  eventController.create
);

// * Get all approved events
router.get("/", eventController.getAllApprovedEvents);

// * Get all events (System Admin / Organizer)
router.get("/all", authenticationMiddleware, authorizationMiddleware(['System Admin','Organizer']), eventController.getAllEvents);

// * Get an event by ID
router.get("/:id", eventController.getEvent);

// * Update an event by ID
router.put("/:id", authenticationMiddleware, authorizationMiddleware(['Organizer', 'System Admin']), eventController.updateEvent);

// * Delete an event by ID
router.delete("/:id", authenticationMiddleware, authorizationMiddleware(['Organizer', 'System Admin']), eventController.deleteEvent);

// ✅ Approve or Decline an event by updating its status
router.put("/:id/status", authenticationMiddleware, authorizationMiddleware(['System Admin']), eventController.updateStatus);

module.exports = router;
