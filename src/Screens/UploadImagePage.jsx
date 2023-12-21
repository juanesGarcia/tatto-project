// UploadImagesPage.js
import React from 'react';
import ImageUploader from './imageUploader';
import '../Styles/UploadImg.css';

const UploadImagesPage = ({ onUploadSuccess, onClose }) => {
  return (
    <div className="upload-page">
      <h1 className='upload-mesage'>Subir Imágenes</h1>
      <ImageUploader onUploadSuccess={onUploadSuccess} onClose={onClose} />
    </div>
  );
};

export default UploadImagesPage;
