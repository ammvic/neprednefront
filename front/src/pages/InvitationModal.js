import React, { useState } from "react";
import "./pageStyles/invitation.css";

const InvitationModal = ({ show, onClose, availableDesigns }) => {
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [invitationCount, setInvitationCount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSelectDesign = (design) => {
    setSelectedDesign(design);
  };

  const handleConfirmInvitation = () => {
    if (selectedDesign && invitationCount > 0) {
      setShowConfirmation(true);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmation(false);
    onClose();
  };

  return (
    show && (
      <div className="modal-overlay">
        <div className="modal-content">
          {!showConfirmation ? (
            <>
              <h3>Select an Invitation Design</h3>
              <div className="design-options">
                {availableDesigns.map((design) => (
                  <div
                    key={design.id}
                    className={`design-option ${
                      selectedDesign === design ? "selected" : ""
                    }`}
                    onClick={() => handleSelectDesign(design)}
                  >
                    <img
                      src={design.imageUrl}
                      alt={design.name}
                      className="design-image"
                    />
                    <p>{design.name}</p>
                    {selectedDesign === design && (
                      <span className="checkmark">✔</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="invitation-count">
                <label>Enter number of invitations: </label>
                <input
                  type="number"
                  value={invitationCount}
                  onChange={(e) => setInvitationCount(e.target.value)}
                  min="1"
                  placeholder="Enter quantity"
                />
              </div>
              <div className="modal-buttons">
                <button
                  onClick={handleConfirmInvitation}
                  disabled={!selectedDesign || invitationCount <= 0}
                  className="confirm-button"
                >
                  Confirm
                </button>
                <button onClick={handleCloseModal} className="cancel-button">
                  Close
                </button>
              </div>
            </>
          ) : (
            <div className="confirmation-message">
              <p>Your invitations will be ready in 7 days. Please come to the studio for pickup.</p>
              <button onClick={handleCloseModal} className="ok-button">OK</button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default InvitationModal;
