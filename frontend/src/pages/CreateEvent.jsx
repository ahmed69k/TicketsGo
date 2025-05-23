import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import '../styling/CreateEvent.css'

function CreateEvent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [tickets, setTickets] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0); // Add this if your schema requires it
  const [category, setCategory] = useState(""); // Add this if your schema requires it
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/events", {
        title: name,
        description,
        date,
        location,
        totalTickets: tickets,
        remainingTickets: tickets,
        ticketPrice,
        category,
      });

      toast.success("Event created successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error(error.response?.data?.message || "Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-page">
      <h1>Create New Event</h1>
      <form onSubmit={handleSubmit}>
      <div className="input-group-ce">
        <label htmlFor="name">Event Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="input-group-ce">
      <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="input-group-ce">
        <label htmlFor="date">Date & Time:</label>
        <input
          id="date"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="input-group-ce">
          <label htmlFor="location">Location:</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div className="input-group-ce">
                <label htmlFor="tickets">Number of Tickets:</label>
        <input
          id="tickets"
          type="number"
          min="1"
          value={tickets}
          onChange={(e) => setTickets(parseInt(e.target.value, 10))}
          required
        />
      </div>

      <div className="input-group-ce">
               <label htmlFor="ticketPrice">Ticket Price:</label>
        <input
          id="ticketPrice"
          type="number"
          min="0"
          value={ticketPrice}
          onChange={(e) => setTicketPrice(parseFloat(e.target.value))}
          required
        />
      </div>

      <div className="input-group-ce">
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
