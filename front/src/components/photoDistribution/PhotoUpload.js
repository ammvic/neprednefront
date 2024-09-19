import React, { useState } from 'react';
import '../../components/photoDistribution/photoUpload.css';

const PhotoUpload = () => {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('');
  const selectedSessionId = localStorage.getItem('selectedSessionId'); // Rezervacija korisnika
  const loggedInEmployeeId = localStorage.getItem('employeeId'); // ID prijavljenog zaposlenog

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setStatus('Please select files to upload.');
      return;
    }

    try {
      // 1. Prvo kreiramo album
      const albumData = {
        SessionId: selectedSessionId ? parseInt(selectedSessionId) : 0,
        EmployeeId: loggedInEmployeeId ? parseInt(loggedInEmployeeId) : 0,
        IsPublic: false
      };
      console.log('Album data to be sent:', albumData);

      const albumResponse = await fetch('http://miellephotostudiobe.somee.com/api/Albums/createAlbum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(albumData),
      });
      const albumResponseData = await albumResponse.json();
      console.log('Album response data:', albumResponseData);

      // Provera da li je album uspešno kreiran
      if (!albumResponse.ok || !albumResponseData.Code) {
        console.error('Error creating album:', albumResponseData);
        setStatus('Error creating album.');
        return;
      }

      const albumId = albumResponseData.Id; // ID novokreiranog albuma
      setStatus(`Album created successfully! Access code: ${albumResponseData.Code}`);

      // 2. Nakon uspešnog kreiranja albuma, upload-ujemo fotografije
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('photos', file);
      });

      const photoUploadResponse = await fetch(`http://miellephotostudiobe.somee.com/api/Albums/uploadPhotos?albumId=${albumId}&employeeId=${loggedInEmployeeId}`, {
        method: 'POST',
        body: formData,
      });

      if (!photoUploadResponse.ok) {
        setStatus('Error uploading photos.');
        return;
      }

      setStatus('Photos uploaded and album created successfully!');
      setFiles([]);
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setStatus('Error uploading photos or creating album.');
    }
  };

  return (
    <div className="photo-upload-container">
      <h2>Upload Photos</h2>
      <input type="file" accept="image/*" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default PhotoUpload;
