import React, { useState } from 'react';
import '../Styles/Follower.css';
import Avatar from "@mui/material/Avatar";
import { useNavigate } from 'react-router-dom';


const FollowedModal = ({ followed, onClose }) => {
  const navigate = useNavigate();
  const [showAllFollowed, setShowAllFollowed] = useState(false);

  const visibleFollowed = showAllFollowed ? followed : followed.slice(0, 3);

  const handleClose = () => {
    setShowAllFollowed(false);  
    onClose();
  };
  
  const handlemove = (followed_id,followed_name) =>{
    navigate(`/profile/${encodeURIComponent(followed_id)}/${encodeURIComponent(followed_name)}`);
    onClose();
  }


  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-contentf" onClick={(e) => e.stopPropagation()}>
        {/* Contenido del modal */}
        <h2>{followed.length} Seguidos</h2>
        <div className="follower-list">
          <div className='followitems'>
            {visibleFollowed.map((followed) => (
              <div className='namefollow' key={followed.followed_name}><Avatar sx={{ width: 50, height: 50 }} src={followed.media_url}>{followed.followed_name[0].toUpperCase()}</Avatar><div className='namef'  onClick={() => handlemove(followed.followed_id, followed.followed_name)}>{followed.followed_name}</div></div>
            ))}
          </div>
        </div>
        {followed.length > 3 && !showAllFollowed && (
          <div className='showmore' onClick={() => setShowAllFollowed(true)}>Ver más</div>
        )}
        {showAllFollowed && (
          <div className='showless' onClick={() => setShowAllFollowed(false)}>Ver menos</div>
        )}
      </div>
    </div>
  );
};

export default FollowedModal;