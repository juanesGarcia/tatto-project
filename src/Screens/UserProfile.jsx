import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setInfo } from '../redux/slices/authSlice';
import logo from "/images/logofinal.jpg";
import Avatar from "@mui/material/Avatar";
import "../Styles/UserProfile.css";
export const UserProfile = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { isAuth, info } = useSelector((state) => state.auth);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    if (isAuth && name === info.name) {
      setIsOwnProfile(true);
    } else {
      setIsOwnProfile(false);
    }
  }, [isAuth, name, info]);

  return (
    <>
      <div className='containerProfile'>
      <Avatar src={logo} sx={{ width: 140, height: 140 }}></Avatar>
      <div className='containerInfo'>
      <h4>{name}                           ********</h4>
      <h4> bogota</h4>
      <h4> calle 48csur #25-94</h4>
      </div>
    
      
    </div>  
    <div className='buttonPerfil'>
        <button className='button'>
          seguir
        </button>
        <button className='button'>
          <a href="https://www.instagram.com/juanestebancubillos/" className='insta'>instagram</a>
         
        </button>
        {isAuth ? (
        <div>
          {isOwnProfile && (
              <NavLink to="/AdminAccount"className='button'><h5 className='editar'>editar</h5></NavLink>
          )}
          
        </div>
      ) :null}
        
      </div>
    </>
    
  );
};
