import '../styling/ApprovedEvents.css'
import { useAuth } from '../auth/AuthContext'
import { useEffect, useState } from 'react'
import api from '../services/api'
import '../styling/AllEvents.css'
import {toast} from 'react-toastify';

function AllEvents(){
    const [events,setEvents] = useState(null)
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        const fetchEvents = async() =>{
            try{
                const res = await api.get('/events/all')
                setEvents(res.data);
                setLoading(false);
            }
            catch(e){
                console.log("Error fetching events:",e)
            }
        }
        fetchEvents();
    },[])
          if (loading){
    return(
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        <img src="/loader.gif" alt="Loading..." style={{ width: 500, height: 500 }} />
      </div>
    )
  }

    if(!events){
        return <h1 className="no-event">No events available!</h1>
    }


    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()))



    return(
        <div className="events-container">
            <h1 className='title-events-all'>All Events</h1>
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
                    <div className='button-group'>
                    {event.Status === "Pending" ? (
                        <>
                        <button className='approve-btn' onClick={() => toast.success('Event approved!')}> Approve</button>
                        <button className='reject-btn'>Reject</button>
                        </>
                        
                    ) : null}
                    <button className='delete-btn'> Delete</button>
                    </div>
                
                </div>
                
                
            ))}
            </div>
        </div>
    )


}

export default AllEvents