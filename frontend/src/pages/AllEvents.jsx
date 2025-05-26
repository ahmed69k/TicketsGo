import '../styling/ApprovedEvents.css';
import '../styling/AllEvents.css';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

function AllEvents() {
  const [events, setEvents] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events/all');
        setEvents(res.data);
        setLoading(false);
      } catch (e) {
        console.log("Error fetching events:", e);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        <img src="/loader.gif" alt="Loading..." style={{ width: 500, height: 500 }} />
      </div>
    );
  }

  if (!events) {
    return <h1 className="no-event">No events available!</h1>;
  }

  const handleApprove = async (eventId) => {
    try {
      await api.put(`/events/${eventId}/status`, { Status: "Approved" });
      setEvents((prev) =>
        prev.map((event) =>
          event._id === eventId ? { ...event, Status: "Approved" } : event
        )
      );
      toast.success("Event approved!");
    } catch (e) {
      console.error("Error approving event:", e);
      toast.error("Failed to approve event!");
    }
  };

  const handleReject = async (eventId) => {
    try {
      await api.put(`/events/${eventId}/status`, { Status: "Declined" });
      setEvents((prev) =>
        prev.map((event) =>
          event._id === eventId ? { ...event, Status: "Declined" } : event
        )
      );
      toast.info("Event rejected.");
    } catch (e) {
      console.error("Error rejecting event:", e);
      toast.error("Failed to reject event!");
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await api.delete(`/events/${eventId}`);
      setEvents((prev) => prev.filter((event) => event._id !== eventId));
      toast.success("Event deleted!");
    } catch (e) {
      console.error("Error deleting event:", e);
      toast.error("Failed to delete event!");
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="events-container">
      <h1 className="title-events-all">All Events</h1>
      <input
        type="text"
        placeholder="Search events..."
        className="search-input-all"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="events-container">
        {filteredEvents.map((event, index) => (
          <div className="event-box" key={index}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <img
                src={`${import.meta.env.VITE_BACKEND_LINK_RAILWAY}${event.image}`}
                alt={event.title}
                style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "8px" }}
              />
              <h2>{event.title}</h2>
            </div>
            <p><strong>Date and Time: </strong>{new Date(event.date).toLocaleString()}</p>
            <p><strong>Location: </strong>{event.location}</p>
            <p><strong>Description: </strong>{event.description}</p>
            <p><strong>Ticket price: </strong>{event.ticketPrice}</p>
            <p><strong>Remaining tickets: </strong>{event.remainingTickets}</p>
            <p><strong>Status: </strong>{event.Status}</p>

            <div className="button-group">
              {event.Status === "Pending" && (
                <>
                  <button className="approve-btn" onClick={() => handleApprove(event._id)}>Approve</button>
                  <button className="reject-btn" onClick={() => handleReject(event._id)}>Reject</button>
                </>
              )}
              <button className="delete-btn" onClick={() => handleDelete(event._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllEvents;