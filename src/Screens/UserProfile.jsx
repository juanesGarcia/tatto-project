import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from "/images/logofinal.jpg";
import Avatar from "@mui/material/Avatar";
import { getUser } from '../api/auth';
import "../Styles/UserProfile.css";
import UploadImagesPage from './UploadImagePage';
import 'react-image-gallery/styles/css/image-gallery.css';
import OpenModal  from './OpenModal';


export const UserProfile = () => {
  const { name,id  } = useParams();
  const navigate = useNavigate();
  const { isAuth, info } = useSelector((state) => state.auth);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [user, setUser] = useState([]);
  const [showUploadPage, setShowUploadPage] = useState(false);




  useEffect(() => {
    if (isAuth && name === info.name) {
      setIsOwnProfile(true);
    } else {
      setIsOwnProfile(false);
    }
   
  }, [isAuth, name, info]);





  const showData = async () => {
  
    try {
      const response = await getUser(id);
      const data = response.data;
      console.log(data.info)
      const parsedUsers = parseUserData(data.info);
      console.log(parsedUsers);
      setUser(parsedUsers);
      const nameExists = parsedUsers.some(user => user.name === name) ;
      console.log(nameExists)
      if (nameExists) {
        console.log(`El nombre ${name} está en la lista`);
      } else {
        navigate("/")
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
      const match = item.row.match(/\((.*?),(.*?),(.*?),(.*?)\)/);
      return {
        name: match[1],
        email:match[2],
        rol:match[3],
        phone:match[4],
        avatar: "/images/fondo.jpg"
      };
    });
  };



  const updatePhoto = () => {
    if (showUploadPage) {
      setShowUploadPage(false);
    } else {
      setShowUploadPage(true);
    }


  };

  const handleUploadSuccess = () => {
    // Puedes hacer algo después de que se completen con éxito las cargas de imágenes
    console.log('Imágenes subidas con éxito desde ImageUploader');
    setShowUploadPage(false);
    
  };



  const handleCloseUploadPage = () => {
    setShowUploadPage(false);
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
          follow
        </button>
        {
  user.length > 0 && user[0].rol === 'tatuador' && (
    <button className='button'>
      <a href={`https://wa.me/${user[0].phone}?text=Hola%20${name},%0A%0AEstoy%20interesado%20en%20obtener%20información%20sobre%20los%20precios%20de%20los%20tatuajes%20y%20discutir%20la%20posibilidad%20de%20programar%20una%20cita%20contigo.%20¿Podrías%20proporcionarme%20más%20detalles%20sobre%20tus%20servicios%20y%20disponibilidad?%0A%0AGracias`}  target="_blank" rel="noopener noreferrer" className='whatsapp'>Whatsapp</a>
    </button>
  )
}  

        {isAuth ? (
          <div>
            {isOwnProfile && (
                  <button className='button' onClick={() => updatePhoto()}>
                  <a className='uploadphoto-but'>subir foto</a>
                </button>
            )}

          </div>
        ) : null}
    

      </div>
      {showUploadPage && (
        <UploadImagesPage onUploadSuccess={handleUploadSuccess} onClose={handleCloseUploadPage}  id={id} />
      )}
      <OpenModal isAuthp={isAuth} isOwnProfilep={isOwnProfile} id={id}></OpenModal>

    </>

  );
};
