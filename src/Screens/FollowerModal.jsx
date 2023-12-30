import React from 'react';
import '../Styles/Follower.css'

const FollowerModal = ({ followers, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Contenido del modal */}
        <h2>Seguidores</h2>
        <ul>
          {followers.map((follower) => (
            <li key={follower.follower_name}>{follower.follower_name}</li>
          ))}
        </ul>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default FollowerModal;
