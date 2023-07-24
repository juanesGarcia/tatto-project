import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from "/images/logofinal.jpg";
import Avatar from "@mui/material/Avatar";
import { getUsers } from '../api/auth';
import "../Styles/UserProfile.css";
export const UserProfile = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, info } = useSelector((state) => state.auth);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (isAuth && name === info.name) {
      setIsOwnProfile(true);
    } else {
      setIsOwnProfile(false);
    }
  }, [isAuth, name, info]);
  const showData = async () => {
    try {
      const response = await getUsers();
      const data = response.data;
      const parsedUsers = parseUserData(data);
      console.log(parsedUsers);
      setUsers(parsedUsers);
      console.log(name)
      const filtered= parsedUsers.filter((num) => num.name===name);
    console.log(filtered)
    if(filtered.length==0){
      navigate("/");
    }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showData();

  }, []);

  const parseUserData = (data) => {
    return data.map((item) => {
      const match = item.row.match(/\((.*?),(.*?)\)/);
      return {
        id: match[1],
        name: match[2],
        avatar: "/images/fondo.jpg"
      };
    });
  };


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
    <div className='followInfo'> 
      <h6>publicaciones 16</h6>
      <h6 className='follow'>  seguidores 5</h6>
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
