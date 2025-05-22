
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import api from "../services/api"
import '../styling/ApprovedEvents.css'
import { useAuth } from "../auth/AuthContext"


function ApprovedEvents(){
    const [events, setEvents] = useState(null)
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(()=>{
        const fetchEvents = async() =>{
            try{
                const res = await api.get('/events/')
                setEvents(res.data);
            }
            catch(e){
                console.log("Error fetching events:",e)
            }
        }
        fetchEvents();
    },[])

    if(!events){
        return <h1 className="no-event">No events available!</h1>
    }


    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()))


    console.log(events)
    return(
        <div>
            <h1 className="event-title">Available Events</h1>
            <input
                type="text"
                placeholder="Search events..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        <div className="events-container">
            {filteredEvents.map((event, index) => (
                <div className="event-box" key={index}>
                    <h2>{event.title}</h2>
                    <p><strong>Date: </strong> {event.date}</p>
                    <p><strong>Location: </strong> {event.location}</p>
                    <p><strong>Description: </strong> {event.description}</p>
                    <p><strong>Ticket price: </strong>{event.ticketPrice}</p>
                    <p><strong>Remaining tickets: </strong>{event.remainingTickets}</p>
                    <button className="button-lr">Book Event</button>
                </div>
            ))}
        </div>
        </div>
    )

}

export default ApprovedEvents