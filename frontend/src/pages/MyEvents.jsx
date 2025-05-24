import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import pic from '../assets/defaultpfp.jpg'
import '../styling/MyEvents.css'

const COLORS = ["#00C49F", "#FF8042"]; // booked, remaining

function MyEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await api.get("/users/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };
    fetchMyEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      await api.delete(`/events/${eventId}`);
      setEvents(events.filter(event => event._id !== eventId));
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  const handleEdit = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };
  const getStatusColor = (status) => {
    if (status === "approved") return "green";
    if (status === "pending") return "orange";
    if (status === "declined") return "red";
    return "gray";
  };

  const renderAnalytics = (event) => {
    const booked = event.totalTickets - event.remainingTickets;
    const remaining = event.remainingTickets;

    const data = [
      { name: "Booked", value: booked },
      { name: "Remaining", value: remaining }
    ];

    return (
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill="#ec4899"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    );
  };

  return (
  <div>
    <h1 className="title-me">My Events</h1>
    {events.length === 0 ? (
      <p>No events found.</p>
    ) : (
      
      <div className="event-cards-container">
        {events.map((event) => (
        <div key={event._id} className="event-card">
          <div className="pic-name">
            <img className="img-myevents" src={event.image ? `${import.meta.env.VITE_BACKEND_LINK_RAILWAY}${event.image}`: pic} alt="no pic" />
            <h3 className="title-e">{event.title}</h3>
          </div>
          <p>{event.description}</p>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Tickets:</strong> {event.totalTickets - event.remainingTickets} / {event.totalTickets} booked</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={`status-text status-${event.Status}`}>
              {event.Status}
            </span>
          </p>
          <div className="event-actions">
            {renderAnalytics(event)}
            <div>
              <button className="edit-btn" onClick={() => handleEdit(event._id)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(event._id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
      </div>
    )}
  </div>
);
}

export default MyEvents;
