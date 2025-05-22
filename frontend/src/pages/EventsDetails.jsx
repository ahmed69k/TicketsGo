import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../auth/AuthContext";
import "../styling/EventsDetails.css";
import {toast} from 'react-toastify'

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [ticketsToBook, setTicketsToBook] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  // Handle booking submission
  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "/bookings",
        {
          eventId: event._id,
          numOfTickets: ticketsToBook,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        setBookingSuccess(true);
        setTicketsToBook(1);
        const updatedEvent = await api.get(`/events/${id}`);
        setEvent(updatedEvent.data);
        toast.success("Booking Successful!")
      }
    } catch (err) {
      console.error("Booking failed:", err);
      toast.error("Booking Error!")
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event not found</p>;

  const remaining = event.remainingTickets;

  const availabilityMessage =
    remaining === 0
      ? "Sold Out"
      : remaining <= 5
      ? `Only ${remaining} tickets left!`
      : `${remaining} tickets available`;

  return (
    <div className="event-details-in">
      <h1>{event.title}</h1>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Ticket Price:</strong> ${event.ticketPrice}</p>
      <p><strong>Availability:</strong> {availabilityMessage}</p>

      {/* Only show form if user is logged in and tickets are available */}
      {isLoggedIn && remaining > 0 && (
        <form className="booking-form" onSubmit={handleBooking}>
          <label htmlFor="tickets">Number of Tickets:</label>
          <input
            type="number"
            id="tickets"
            name="tickets"
            min="1"
            max={remaining}
            value={ticketsToBook}
            onChange={(e) => setTicketsToBook(Number(e.target.value))}
            required
          />
          <button className="button-lr"type="submit">Book Now</button>
        </form>
      )}

      {!isLoggedIn && (
        <p style={{ color: "#e91e63", marginTop: "1rem" }}>
          Please log in to book tickets.
        </p>
      )}

      {remaining === 0 && (
        <p style={{ color: "red", fontWeight: "bold" }}>This event is sold out.</p>
      )}
    </div>
  );
}

export default EventDetails;
