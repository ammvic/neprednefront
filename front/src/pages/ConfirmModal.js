import React from "react";
import './pageStyles/ConfirmModal.css';

const ConfirmModal = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Are you sure?</h3>
        <p>Do you really want to cancel this booking?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-button">
            Yes, Cancel
          </button>
          <button onClick={onClose} className="close-button">
            No, Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
