const bookingModel=require('../Models/BookingSchema')
const eventModel=require('../Models/EventSchema')
require ('dotenv').config()
const mongoose = require('mongoose')

const bookingController={
    getBookingDetails: async(req, res)=>{
       
        try{
            const id = req.id
            bookingDetails = bookingModel.findById(id)

            if (!bookingDetails){
                return res.status(404).json({ message: "Event not found" });
            }
            return res.status(200).json(bookingDetails)
        }
        catch(e){
            console.log("System Error...")
            res.status(500).json({message:e})

        }


    }
    
}

