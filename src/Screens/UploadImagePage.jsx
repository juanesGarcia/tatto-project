import React from 'react';
import ImageUploader from './imageUploader';
import '../Styles/UploadImg.css';

const UploadImagesPage = ({ onUploadSuccess, onClose ,id}) => {
  

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contentp" onClick={(e) => e.stopPropagation()}>
      <div className="upload-page">
      <div className='upload-mesage2'>Subir Imágenes</div>
      <ImageUploader onUploadSuccess={onUploadSuccess} onClose={onClose} id={id} />
    </div>
      </div>
    </div>

  );
};

export default UploadImagesPage;
