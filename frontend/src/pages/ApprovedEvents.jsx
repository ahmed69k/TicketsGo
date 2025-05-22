import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import "../styling/ApprovedEvents.css";

function ApprovedEvents() {
    const [events, setEvents] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get('/events/');
                setEvents(res.data);
            } catch (e) {
                console.log("Error fetching events:", e);
            }
        };
        fetchEvents();
    }, []);

    const filteredEvents = events?.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
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
                {filteredEvents?.map((event, index) => (
                    <div
                        className="event-box"
                        key={index}
                        onClick={() => navigate(`/events/${event._id}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <h2>{event.title}</h2>
                        <p><strong>Date: </strong> {new Date(event.date).toLocaleString()}</p>
                        <p><strong>Location: </strong> {event.location}</p>
                        <p><strong>Ticket Price: </strong>{event.ticketPrice} EGP</p>
                        <button className="button-lr">View & Book</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ApprovedEvents;
