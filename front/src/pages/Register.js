import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, verifyUser } from "../services/Services";
import VerificationModal from "./VerificationModal";
import "./pageStyles/auth.css";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        address,
      });

      console.log("Server Response:", response.data); // Proverite šta server vraća

      if (
        response.data &&
        response.data.Message &&
        response.data.Message.includes("Verification code sent")
      ) {
        setIsModalOpen(true);
      } else {
        setError(response.data.Message || "Registration initiation failed");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      setError("Registration failed");
    }
  };

  const handleVerify = async (verificationCode) => {
    try {
      const response = await verifyUser(email, verificationCode);
      if (
        response.data ===
        "User verified and registration completed successfully."
      ) {
        setIsRegistered(true);
        setIsModalOpen(false);
        navigate("/login");
      } else {
        setError("Invalid verification code");
      }
    } catch (err) {
      setError("Verification failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Get Started</h2>
        <div className="form-group-row">
          <div className="authForm-group" id="name">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="authForm-group" id="name">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="authForm-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="authForm-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="authForm-group">
          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="authForm-group">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="btn">
          <button type="submit" disabled={isRegistered}>
            Register
          </button>
        </div>
      </form>

      {/* Modal za verifikaciju */}
      <VerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVerify={handleVerify}
        email={email}
      />
    </div>
  );
}

export default Register;
