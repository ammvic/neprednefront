import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "./photoGallery.css";
import { UserContext } from "../../contexts/UserContext";
import { saveAs } from 'file-saver';

const PhotoGallery = () => {
  const { user, token } = useContext(UserContext);
  const [credits, setCredits] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [album, setAlbum] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [showDesignModal, setShowDesignModal] = useState(false); 
  const [selectedDesign, setSelectedDesign] = useState(null);

  const availableDesigns = [
    { id: 1, name: "Elegant", imageUrl: "/dizajn1.jpeg" },
    { id: 2, name: "Modern", imageUrl: "/dizajn2.jpeg" },
    { id: 3, name: "Classic", imageUrl: "/dizajn3.jpeg" },
    { id: 4, name: "Vintage", imageUrl: "/dizajn4.jpeg" }
  ];

  useEffect(() => {
    if (user) {
      fetchCredits();
    }
  }, [user, token]);

  const fetchCredits = async () => {
    try {
      const response = await axios.get("http://miellephotostudiobe.somee.com/api/Users/MyCredits", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCredits(response.data.Credits || 0);
    } catch (error) {
      console.error("Error fetching credits", error);
    }
  };

  const handleDownloadPhoto = async (photo) => {
    if (!photo || !photo.Cost || !photo.FilePath) {
      setErrorMessage("Invalid photo data.");
      return;
    }
  
    if (credits < photo.Cost) {
      setErrorMessage(`You need at least ${photo.Cost} credits to download this photo.`);
      return;
    }
  
    try {
      const response = await axios.post(
        "http://miellephotostudiobe.somee.com/api/Albums/downloadPhoto",
        {
          UserId: user.Id,
          PhotoId: photo.Id
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob'
        }
      );
  
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const fileName = photo.FilePath.split('/').pop(); // Koristite naziv datoteke iz FilePath
        saveAs(blob, fileName);
  
        setSuccessMessage("Photo downloaded successfully!");
        setErrorMessage("");
      } else {
        setErrorMessage("Failed to download photo.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error downloading photo", error);
      setErrorMessage("Failed to download photo. Please try again.");
      setSuccessMessage("");
    }
  };
  

  const handleFetchAlbum = async () => {
    try {
      const response = await axios.get(`http://miellephotostudiobe.somee.com/api/Albums/${accessCode}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const albumData = response.data;
      if (albumData && albumData.Media && Array.isArray(albumData.Media.$values)) {
        const album = albumData;
        const photos = albumData.Media.$values;
        setPhotos(photos);
        setAlbum(album);
      } else {
        setErrorMessage("Unexpected album data format.");
      }
    } catch (error) {
      console.error("Error fetching album with photos", error);
      setErrorMessage("Failed to fetch album. Please try again.");
    }
  };

  const handleClickPhoto = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseLightbox = () => {
    setSelectedPhoto(null);
  };

  const handleToggleSelectPhoto = (photo) => {
    setSelectedPhotos((prevSelectedPhotos) =>
      prevSelectedPhotos.includes(photo)
        ? prevSelectedPhotos.filter((p) => p !== photo)
        : [...prevSelectedPhotos, photo]
    );
  };

  const handleOpenDesignModal = () => {
    setShowDesignModal(true);
  };

  const handleSelectDesign = (design) => {
    setSelectedDesign(design.id);
  };

  const handleConfirmSelection = () => {
    setSuccessMessage("Please come to the studio in 15 days to collect your album.");
    setSelectedPhotos([]);
    setSelectedDesign(null);
  };

  return (
    <div className="photo-gallery-container">
      <h2>Your Albums</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className="access-code-form">
        <input
          type="text"
          placeholder="Enter album access code"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
        />
        <button onClick={handleFetchAlbum}>Fetch Album</button>
      </div>
      {album ? (
        photos.length === 0 ? (
          <p>No photos available in this album.</p>
        ) : (
          <div className="photo-gallery-content">
            {photos.map((photo, index) => (
              <div key={photo.Id || index} className="photo-thumbnail">
                <img
                  src={`http://miellephotostudiobe.somee.com${photo.FilePath}`}
                  alt="Photo"
                  className={`photo-image ${selectedPhotos.includes(photo) ? 'selected' : ''}`}
                  onClick={() => handleClickPhoto(photo)}
                />
                <button 
                  className="select-button" 
                  onClick={() => handleToggleSelectPhoto(photo)}
                >
                  {selectedPhotos.includes(photo) ? '✔' : '✗'}
                </button>
                <button 
                  className="download-button" 
                  onClick={() => handleDownloadPhoto(photo)}
                >
                  Download
                </button>
              </div>
            ))}
            {!successMessage && (
              <div>
                <button className="confirm-selection-button" onClick={handleOpenDesignModal}>
                  Choose Cover Design
                </button>
                <button className="confirm-selection-button" onClick={handleConfirmSelection}>
                  Confirm Selection
                </button>
              </div>
            )}
          </div>
        )
      ) : (
        <p>Please enter an access code to view the album.</p>
      )}

      {selectedPhoto && (
        <div className="lightbox" onClick={handleCloseLightbox}>
          <button className="lightbox-close" onClick={handleCloseLightbox}>
            &times;
          </button>
          <img src={`http://miellephotostudiobe.somee.com${selectedPhoto.FilePath}`} alt="Selected Photo" />
        </div>
      )}

      {showDesignModal && (
        <div className="design-modal">
          <div className="design-modal-content">
            <h3>Select a Cover Design</h3>
            <div className="design-options">
              {availableDesigns.map((design) => (
                <div
                  key={design.id}
                  className={`design-option ${selectedDesign === design.id ? 'selected' : ''}`}
                  onClick={() => handleSelectDesign(design)}
                >
                  <img src={design.imageUrl} alt={design.name} className="design-image" />
                  <p>{design.name}</p>
                  {selectedDesign === design.id && (
                    <span className="checkmark">✔️</span>
                  )}
                </div>
              ))}
            </div>
            <button className="close-modal-button" onClick={() => setShowDesignModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
