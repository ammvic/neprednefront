import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import InvitationModal from "./InvitationModal"; // Uvozimo novi modal
import "./pageStyles/dash.css";

const UserDash = () => {
  const { user, token, logout } = useContext(UserContext);
  const [credits, setCredits] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false); // State za modal pozivnica
  const navigate = useNavigate();

  const availableDesigns = [
    { id: 1, name: "Classic", imageUrl: "/dizajn5.jpeg" },
    { id: 2, name: "Modern", imageUrl: "/dizajn6.jpeg" },
    { id: 3, name: "Elegant", imageUrl: "/dizajn7.jpeg" },
    { id: 4, name: "Elegant", imageUrl: "/dizajn8.jpeg" },
  ];

  const fetchCredits = async () => {
    try {
      const response = await axios.get("http://miellephotostudiobe.somee.com/api/Users/MyCredits", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const creditsValue = response.data.Credits;
      setCredits(creditsValue || 0);
    } catch (error) {
      console.error("Error fetching credits", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://miellephotostudiobe.somee.com/api/Users/MyBookings", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.bookings && Array.isArray(response.data.bookings.$values)) {
        setBookings(response.data.bookings.$values);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCredits();
      fetchBookings();
    }
  }, [user, token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCancelBooking = async () => {
    try {
      console.log("Cancelling booking with ID:", selectedBookingId);
      const response = await axios.delete(
        `http://miellephotostudiobe.somee.com/api/Bookings/${selectedBookingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Booking cancelled:", response.data);
      setShowModal(false);
      fetchBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error.response?.data || error);
    }
  };

  const openModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleNavigateToGallery = () => {
    navigate("/photo-gallery");
  };

  const openInvitationModal = () => {
    setShowInvitationModal(true);
  };

  const closeInvitationModal = () => {
    setShowInvitationModal(false);
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to Your Dashboard</h2>

      <div className="dashboard-section">
        <h3>Upcoming Bookings</h3>
        <ul>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => {
              return (
                <li key={index}>
                  Date: {new Date(booking.DateTime).toLocaleDateString()} - Time: {new Date(booking.DateTime).toLocaleTimeString()}
                  <button
                    onClick={() => openModal(booking.Id)}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </li>
              );
            })
          ) : (
            <li>
              No upcoming bookings. 
              <Link to="/booking" className="schedule-link">
                Schedule your booking now!
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="dashboard-section">
        <h3>Credits</h3>
        <p>
          You have <strong>{credits} credits</strong> available.
        </p>
      </div>

      <div className="dashboard-section">
        <h3>Downloadable Content</h3>
        <button onClick={handleNavigateToGallery}>Your Gallery</button>
      </div>

      <div className="dashboard-section">
        <h3>Create Invitations</h3>
        <button onClick={openInvitationModal}>Create Invitations</button> {/* Dugme za kreiranje pozivnica */}
      </div>

      <div className="dashboard-section">
        <button onClick={handleLogout}>Log Out</button>
      </div>

      <ConfirmModal
        show={showModal}
        onClose={closeModal}
        onConfirm={handleCancelBooking}
      />

      <InvitationModal
        show={showInvitationModal}
        onClose={closeInvitationModal}
        availableDesigns={availableDesigns}
      />
    </div>
  );
};

export default UserDash;
