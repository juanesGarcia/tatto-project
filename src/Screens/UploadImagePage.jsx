// UploadImagesPage.js
import React from 'react';
import ImageUploader from './imageUploader';
import '../Styles/UploadImg.css';

const UploadImagesPage = ({ onUploadSuccess, onClose ,id}) => {
  return (
    <div className="upload-page">
      <div className='upload-mesage'>Subir Imágenes</div>
      <ImageUploader onUploadSuccess={onUploadSuccess} onClose={onClose} id={id} />
    </div>
  );
};

export default UploadImagesPage;
