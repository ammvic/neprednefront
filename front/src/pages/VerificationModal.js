import React, { useState } from "react";
import "./pageStyles/modalStyles.css"; 

function VerificationModal({ isOpen, onClose, onVerify, email }) {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!verificationCode) {
      setError("Verification code is required");
      return;
    }
    try {
      await onVerify(verificationCode);
    } catch (err) {
      setError("Verification failed");
    }
  };

  return (
    isOpen ? (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Enter Verification Code</h3>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Verification Code"
          />
          {error && <p className="error-message">{error}</p>}
          <button onClick={handleVerify}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    ) : null
  );
}

export default VerificationModal;
