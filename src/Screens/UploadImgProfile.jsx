import React from 'react';
import '../Styles/UploadImgProfile.css';
import ImagesProfileUpload from './ImagesProfileUpload';

const UploadImgProfile = ({ onClose,id,user}) => {
  

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contentimg" onClick={(e) => e.stopPropagation()}>
      <div className="upload-page">
      <div className='upload-mesageimg'>Sube una imagen de perfil</div>
       <ImagesProfileUpload id={id} onClose={onClose} user={user}></ImagesProfileUpload>
    </div>
      </div>
    </div>

  );
};

export default UploadImgProfile
