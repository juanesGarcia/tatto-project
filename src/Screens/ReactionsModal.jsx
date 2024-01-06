import React, { useState } from 'react'
import '../Styles/ReactionsModal.css';
import Avatar from "@mui/material/Avatar";
import { useNavigate } from 'react-router-dom';


export const ReactionsModal = ({userReactions, onClose,setSelectedPost}) => {
    const navigate = useNavigate();
    const [showAllReactions, setShowAllReactions] = useState(false);
  
    const visibleReactions = showAllReactions? userReactions : userReactions.slice(0, 3);
  
    const handleClose = () => {
      setShowAllReactions(false);  
      onClose()
    };
    
    const handlemove = (Reactions_id,Reactions_name) =>{
      navigate(`/profile/${encodeURIComponent(Reactions_id)}/${encodeURIComponent(Reactions_name)}`);
      setSelectedPost(null)
      onClose()
    }
  
  
    return (
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {/* Contenido del modal */}
          <h2 className='count-likes'>{userReactions.length}  Starts</h2>
          <div className="reactions-list">
            <div className='reactionsitems'>
              {visibleReactions.map((user) => (
                <div className='namereactions' key={user.id}><Avatar sx={{ width: 30, height: 30 }}>{user.name[0]}</Avatar><div className='name'  onClick={() => handlemove(user.id, user.name)}>{user.name}</div></div>
              ))}
            </div>
          </div>
          {userReactions.length > 3 && !showAllReactions && (
            <div className='showmore' onClick={() => setShowAllReactions(true)}>Ver más</div>
          )}
          {showAllReactions && (
            <div className='showless' onClick={() => setShowAllReactions(false)}>Ver menos</div>
          )}
        </div>
      </div>
    );
  };

