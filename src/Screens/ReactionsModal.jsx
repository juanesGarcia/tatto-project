import React, { useState } from 'react'
import '../Styles/ReactionsModal.css';
import Avatar from "@mui/material/Avatar";
import { useNavigate } from 'react-router-dom';


export const ReactionsModal = ({userReactions, onClose,setSelectedPost}) => {
    const navigate = useNavigate();
    const [showAllFollowed, setShowAllFollowed] = useState(false);
  
    const visibleFollowed = showAllFollowed ? userReactions : userReactions.slice(0, 3);
  
    const handleClose = () => {
      setShowAllFollowed(false);  
      onClose()
    };
    
    const handlemove = (followed_id,followed_name) =>{
      navigate(`/profile/${encodeURIComponent(followed_id)}/${encodeURIComponent(followed_name)}`);
      setSelectedPost(null)
      onClose()
    }
  
  
    return (
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {/* Contenido del modal */}
          <h2 className='count-likes'>{userReactions.length}  Starts</h2>
          <div className="follower-list">
            <div className='followitems'>
              {visibleFollowed.map((user) => (
                <div className='namefollow' key={user.id}><Avatar sx={{ width: 30, height: 30 }}>{user.name[0].toUpperCase()}</Avatar><div className='name'  onClick={() => handlemove(user.id, user.name)}>{user.name}</div></div>
              ))}
            </div>
          </div>
          {userReactions.length > 3 && !showAllFollowed && (
            <div className='showmore' onClick={() => setShowAllFollowed(true)}>Ver más</div>
          )}
          {showAllFollowed && (
            <div className='showless' onClick={() => setShowAllFollowed(false)}>Ver menos</div>
          )}
        </div>
      </div>
    );
  };

