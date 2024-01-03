import React, { useState } from 'react';
import '../Styles/Follower.css';
import Avatar from "@mui/material/Avatar";
import { useNavigate } from 'react-router-dom';

const FollowerModal = ({ followers, onClose }) => {
  const navigate = useNavigate();
  const [showAllFollowed, setShowAllFollowed] = useState(false);

  const visibleFollowed = showAllFollowed ? followers : followers.slice(0, 3);

  const handleClose = () => {
    setShowAllFollowed(false);
    onClose();
  };

  const handleMoveToProfile = (follower_id, follower_name) => {
    navigate(`/profile/${encodeURIComponent(follower_id)}/${encodeURIComponent(follower_name)}`);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Seguidores</h2>
        <div className="follower-list">
          <div className='followitems'>
            {visibleFollowed.map((follower) => (
              <div className='namefollow' key={follower.follower_id}>
                <Avatar sx={{ width: 60, height: 60 }}>{follower.follower_name[0].toUpperCase()}</Avatar>
                <div className='name' onClick={() => handleMoveToProfile(follower.follower_id, follower.follower_name)}>
                  {follower.follower_name}
                </div>
              </div>
            ))}
          </div>
        </div>
        {followers.length > 3 && !showAllFollowed && (
          <div className='showmore' onClick={() => setShowAllFollowed(true)}>Ver más</div>
        )}
        {showAllFollowed && (
          <div className='showless' onClick={() => setShowAllFollowed(false)}>Ver menos</div>
        )}
        <button className="button" id='cerrar' onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default FollowerModal;
