import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

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
    <div>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
        <input name="date" value={formData.date} onChange={handleChange} type="date" />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
        <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
        <input name="ticketPrice" value={formData.ticketPrice} onChange={handleChange} type="number" placeholder="Price" />
        <input name="totalTickets" value={formData.totalTickets} onChange={handleChange} type="number" placeholder="Total Tickets" />
        <input name="remainingTickets" value={formData.remainingTickets} onChange={handleChange} type="number" placeholder="Remaining Tickets" />
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
}

export default EditEvent;
