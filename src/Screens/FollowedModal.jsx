import React from 'react';
import '../Styles/Follower.css'

const FollowedModal = ({ followed, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Contenido del modal */}
        <h2>Seguidores</h2>
        <ul>
          {followed.map((followed) => (
            <li key={followed.followed_name}>{followed.followed_name}</li>
          ))}
        </ul>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default FollowedModal;
