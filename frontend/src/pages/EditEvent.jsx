import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import '../styling/CreateEvent.css'

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    location: "",
    image: "",
    ticketPrice: "",
    totalTickets: "",
    remainingTickets: ""
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        const event = res.data
        if(event.date){
          const d = new Date(event.date);
        const pad = (n) => n.toString().padStart(2, '0');
        const formatted =
          d.getFullYear() +
          '-' +
          pad(d.getMonth() + 1) +
          '-' +
          pad(d.getDate()) +
          'T' +
          pad(d.getHours()) +
          ':' +
          pad(d.getMinutes());
        event.date = formatted;
        }
        setFormData(res.data);
        
      } catch (err) {
        console.error("Failed to fetch event:", err);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/events/${id}`, formData);
      navigate("/my-events");
    } catch (err) {
      console.error("Failed to update event:", err);
    }
  };

  return (
    <div className="create-event-page">
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="title">Event Name:</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="category">Category:</label>
          <input
            id="category"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="date">Date & Time:</label>
          <input
            id="date"
            name="date"
            type="datetime-local"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="ticketPrice">Ticket Price:</label>
          <input
            id="ticketPrice"
            name="ticketPrice"
            type="number"
            min="0"
            value={formData.ticketPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="totalTickets">Total Tickets:</label>
          <input
            id="totalTickets"
            name="totalTickets"
            type="number"
            min="1"
            value={formData.totalTickets}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="remainingTickets">Remaining Tickets:</label>
          <input
            id="remainingTickets"
            name="remainingTickets"
            type="number"
            min="0"
            value={formData.remainingTickets}
            onChange={handleChange}
            required
          />
        </div>
        <div className="submit-wrapper">
          <button type="submit">Update Event</button>
        </div>
      </form>
    </div>
  );
}

export default EditEvent;