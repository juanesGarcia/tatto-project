import React, { useState } from 'react';
import "../Styles/ShowImgProfile.css";
import Avatar from "@mui/material/Avatar";

const ShowImgProfile = ({onClose,avatar}) => {
  

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contentshow" onClick={(e) => e.stopPropagation()}>
      <div className="image-avatar">
        <Avatar src={avatar}   sx={{ width: 350, height: 350, border: '2px solid black' }}></Avatar>

    </div>
      </div>
    </div>

  );
};

export default ShowImgProfile;