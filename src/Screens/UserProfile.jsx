import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setInfo } from '../redux/slices/authSlice';

export const UserProfile = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { isAuth, info } = useSelector((state) => state.auth);
  const userId = localStorage.getItem('userId');
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    if (isAuth && name === info.name) {
      setIsOwnProfile(true);
    } else {
      setIsOwnProfile(false);
    }
  }, [isAuth, name, info]);

  return (
    <div>
      <h1>User Profile</h1>
      <h1>Value: {name}</h1>

      {isAuth ? (
        <div>
          {isOwnProfile && (
            <button>
              <NavLink to="/AdminAccount">editar perfil</NavLink>
            </button>
          )}
          <h2>id: {info.id}</h2>
        </div>
      ) : (
        <div>
          <h2>id: {userId}</h2>
          <h1>no logeado </h1>
        </div>
      )}
    </div>
  );
};
