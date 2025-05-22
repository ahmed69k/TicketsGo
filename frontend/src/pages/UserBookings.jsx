import "../styling/AllEvents.css"; // reuse styling
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // FIXED: Correct API endpoint
        const res = await api.get("/users/bookings");
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
        toast.error("Failed to load bookings ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      await api.delete(`/bookings/${bookingId}`);
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      toast.success("Booking cancelled 🗑️");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking ❌");
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <img src="/loader.gif" alt="Loading..." style={{ width: 300, height: 300 }} />
      </div>
    );
  }

  if (!bookings.length) {
    return <h1 className="no-event">You have no bookings yet.</h1>;
  }

  return (
    <div className="events-container">
      <h1 className="title-events-all">My Bookings</h1>
      <div className="events-container">
        {bookings.map((booking, index) => (
          <div className="event-box" key={index}>
            <h2>{booking.eventName || "Event Name Unavailable"}</h2>
            <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Seats:</strong> {booking.seats?.join(", ") || "N/A"}</p>
            <p><strong>Status:</strong> {booking.status || "Active"}</p>
            <button className="delete-btn" onClick={() => handleCancel(booking._id)}>
              Cancel Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserBookings;
