require('dotenv').config();
const { get } = require('http');
const eventModel = require('../Models/EventSchema');
const bookingModel = require('../Models/BookingSchema');
const mongoose = require('mongoose');

const eventController = {
    create: async (req, res) => {
        try {
            const { title, description, date, location, category, image, ticketPrice, totalTickets, remainingTickets} = req.body;
            const newEvent = new eventModel({
                title,
                description,
                date,
                location,
                category,
                image,
                ticketPrice,
                totalTickets,
                remainingTickets,
                Creator: req.user.userId

            });
            await newEvent.save();
            res.status(201).json({ message: "Event created successfully!" });
        } catch (error) {
            console.error("Error creating event!", error);
            res.status(500).json({ message: "Server Error!" });
        }
    },
    getAllEvents: async (req, res) => {
        try {
            const events = await eventModel.find();
            res.status(200).json(events);
        } catch (error) {
            console.error("Error fetching events!", error);
            res.status(500).json({ message: "Server Error!" });
        }
    },
    getAllApprovedEvents: async (req, res) => {
        try {
            const events = await eventModel.find({ Status: "Approved" });
            res.status(200).json(events);
        } catch (error) {
            console.error("Error fetching approved events!", error);
            res.status(500).json({ message: "Server Error!" });
        }
    },
    getEvent: async (req, res) => {
        try{
            const event = await eventModel.findById(req.params.id);
            if (!event) {
                return res.status(404).json({ message: "Event not found!" });
            }
            res.status(200).json(event);
        } catch (error) {
            console.error("Error fetching event!", error);
            res.status(500).json({ message: "Server Error!" });
        }
    },
    updateEvent: async (req, res) => {
        try{
            const event = await eventModel.findByIdAndUpdate(
                req.params.id,
                { 
                    title: req.body.title,
                    description: req.body.description,
                    category: req.body.category,
                    date: req.body.date,
                    image: req.body.image,
                    ticketPrice: req.body.ticketPrice,
                    totalTickets: req.body.totalTickets,
                    remainingTickets: req.body.remainingTickets,
                    date: req.body.date,
                    location: req.body.location,
                    Status: req.body.Status
                },
                { new: true }
            );
            if (!event) {
                return res.status(404).json({ message: "Event not found!" });
            }
            res.status(200).json({ message: "Event updated successfully!", event });
        } catch (error) {
            console.error("Error updating event!", error);
            res.status(500).json({ message: "Server Error!" });
        }
    },
    deleteEvent: async (req, res) => {
        try{
            const event = await eventModel.findByIdAndDelete(req.params.id);
            if (!event) {
                return res.status(404).json({ message: "Event not found!" });
            }
            res.status(200).json({ message: "Event deleted successfully!" });
        } catch (error) {
            console.error("Error deleting event!", error);
            res.status(500).json({ message: "Server Error!" });
        }
    },
    updateStatus: async (req, res) => {
        try {
            const event = await eventModel.findByIdAndUpdate(
                req.params.id,
                { Status: req.body.Status },
                { new: true }
            );
            if (!event) {
                return res.status(404).json({ message: "Event not found!" });
            }
            if(event.Status === "Approved") {
                res.status(200).json({ message: "Event approved successfully!", event });
            }
            else if(event.Status === "Declined") {
                res.status(200).json({ message: "Event declined successfully!", event });
            }
            
            
        } catch (error) {
            console.error("Error updating event status!", error);
            res.status(500).json({ message: "Server Error!" });
        }
        
        
    },
    getEventAnalytics: async (req, res) => {
        try {
            const organizerId = req.user.userId;
            const events = await eventModel.find({ Creator: organizerId });
    
            const eventAnalytics = [];

            for (const event of events) {
                const eventId = event._id;
                const foundEvent = await eventModel.findOne({ _id: eventId, Creator: organizerId });
    
                if (!foundEvent) {
                    return res.status(404).json({ message: "Event not found or unauthorized" });
                }

                const bookings = await bookingModel.find({ "bookedTicket.bookingEvent": eventId });
                const eventTitle = foundEvent.title;
                const totalTicketsSold = bookings.reduce((acc, booking) => acc + booking.numOfTickets, 0);
                const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
                const percentageSold = (totalTicketsSold / foundEvent.totalTickets) * 100; 
    
                eventAnalytics.push({
                    eventTitle: eventTitle,
                    eventId: eventId,
                    totalTicketsSold: totalTicketsSold,
                    totalRevenue: totalRevenue,
                    remainingTickets: foundEvent.remainingTickets,
                    percentageSold: percentageSold + "%"
                });
            }
    
            res.status(200).json(eventAnalytics);
    
        } catch (error) {
            console.error("Error fetching event analytics!", error);
            res.status(500).json({ message: "Server Error!" });
        }
    }
    
      
      
      
      
    

}

module.exports = eventController;