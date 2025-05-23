import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

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
          fill="#8884d8"
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
      <h1>My Events with Analytics</h1>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <div key={event._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Tickets:</strong> {event.totalTickets - event.remainingTickets} / {event.totalTickets} booked</p>

            {/* ✅ STATUS */}
            <p>
              <strong>Status:</strong>{" "}
              <span style={{ color: getStatusColor(event.status), fontWeight: "bold" }}>
                {event.status}
              </span>
            </p>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {renderAnalytics(event)}
              <div>
                <button onClick={() => handleEdit(event._id)} style={{ marginRight: "10px" }}>Edit</button>
                <button onClick={() => handleDelete(event._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyEvents;
