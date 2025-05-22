import React, { useEffect, useState } from "react";
import api from "../services/api";

function MyEvents() {
  const [events, setEvents] = useState([]);

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

  return (
    <div>
      <h1>My Events</h1>
      {events.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>{event.date}</p>
          <p>{event.location}</p>
        </div>
      ))}
    </div>
  );
}

export default MyEvents;
