import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from "/images/logofinal.jpg";
import Avatar from "@mui/material/Avatar";
import { getUser , onFollow ,getFollowed, getFollower,getStatusFollow } from '../api/auth';
import "../Styles/UserProfile.css";
import UploadImagesPage from './UploadImagePage';
import 'react-image-gallery/styles/css/image-gallery.css';
import OpenModal  from './OpenModal';
import FollowerModal from './FollowerModal';
import FollowedModal from './FollowedModal';


export const UserProfile = () => {
  const { name,id  } = useParams();
  const navigate = useNavigate();
  const { isAuth, info,postsLength } = useSelector((state) => state.auth);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [user, setUser] = useState([]);
  const [showUploadPage, setShowUploadPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [followers, setFollowers] = useState([]); 
  const [isFollowing, setIsFollowing] = useState(false);  
  const [followerLength,setFollowerLength]= useState();
  const [followed, setFollowed] = useState([]);
  const [followedLength,setFollowedLength]= useState();
  const [showFollowedModal, setShowFollowedModal] = useState(false);
  const [showFollowerModal, setShowFollowerModal] = useState(false);

  const toggleFollowerModal = () => {
    
    setShowFollowerModal(!showFollowerModal);
  };
  
  const toggleFollowedModal = () => {
    setShowFollowedModal(!showFollowedModal);
  };

const getFollowersf = async () => {

  try {
    const response = await getFollower(id)
    const followersArray = response.data.info || [];
    console.log(followersArray)
    // Guardar el array de seguidores en el estado local
    setFollowers(followersArray);
    console.log(followersArray)
    setFollowerLength(followersArray.length)

  } catch (error) {
    console.log(error)
  }
 
};

const getFollowedf = async () => {

  try {
    const response = await getFollowed(id)
    const followedArray = response.data.info || [];
    console.log('siguiendo a',followedArray)
    // Guardar el array de seguidores en el estado local
    setFollowed(followedArray);
    setFollowedLength(followedArray.length)

  } catch (error) {
    console.log(error)
  }
 
};



const getFollowershow = async () => {
  if (followerLength > 0) {
    toggleFollowerModal();
  }
};

const getFollowedshow = async () => {
  if (followedLength > 0) {
    toggleFollowedModal();
  }
};

const checkFollowingStatus = async () => {
  console.log('Llamada a checkFollowingStatus');
  console.log(info.id);
  console.log(id);

  try {
    const response = await getStatusFollow({
      follower_id: info.id,
      followed_id: id
    });

    console.log(response.data.info[0]);
    const {sigue_al_usuario} = response.data.info[0]
    console.log(sigue_al_usuario)

    setIsFollowing(sigue_al_usuario)
  } catch (error) {
    console.log(error);
  }
};


useEffect(() => {
  if (isAuth) {
    checkFollowingStatus();
  }
  getFollowersf();
  getFollowedf();
}, [isAuth]);

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
      console.log(data.info);

      const parsedUsers = parseUserData(data.info);
      console.log(parsedUsers);

      setUser(parsedUsers);
      const nameExists = parsedUsers.some((user) => user.name === name);
      console.log(nameExists);

      if (nameExists) {
        console.log(`El nombre ${name} está en la lista`);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);  // Marcar que la carga ha finalizado
    }
  };

  const follow = async () =>{
    console.log(id,name)
    console.log(info.id,info.name)
    const data = {
      follower_id:info.id,
      followed_id:id
    }

    try {
      const response = await onFollow(data)
      console.log(response)
      setIsFollowed(true);
    } catch (error) {
      console.log(error)
    }
  }



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
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  

  return (
    <>{
      user.length > 0 &&(
        <div>
              <div className='containerProfile'>
        <Avatar src={logo} sx={{ width: 140, height: 140, }} className='img-avatar'></Avatar>
        <div className='containerInfo'>
          <h4> {user[0].name}                     ********</h4>
          <h4> bogota</h4>
          <h4> calle 48csur #25-94</h4>
          <h4>{user[0].rol}</h4>
        </div>
      </div>
      <div className='followInfo'>
        <h6>publicaciones {postsLength}</h6>
        <h6 className='follow' onClick={() => getFollowershow()}>  seguidores {followerLength}</h6>
        <h6 className='follow' onClick={() => getFollowedshow()}>  seguidos {followedLength}</h6>
      </div>
       {/* Renderizar el modal de seguidores */}
       {showFollowerModal && (
        <FollowerModal followers={followers} onClose={toggleFollowerModal} />
      )}
        {showFollowedModal && (
        <FollowedModal followed={followed} onClose={toggleFollowedModal} />
      )}



        </div>
    

      )
    }
    
     
      <div className='buttonPerfil'>
  
      {
  user.length > 0 && user[0].rol === 'tatuador' && !isOwnProfile && (
    <button className='button'>
      <a href={`https://wa.me/${user[0].phone}?text=Hola%20${name},%0A%0AEstoy%20interesado%20en%20obtener%20información%20sobre%20los%20precios%20de%20los%20tatuajes%20y%20discutir%20la%20posibilidad%20de%20programar%20una%20cita%20contigo.%20¿Podrías%20proporcionarme%20más%20detalles%20sobre%20tus%20servicios%20y%20disponibilidad?%0A%0AGracias`}  target="_blank" rel="noopener noreferrer" className='whatsapp'>Whatsapp</a>
    </button>
    
  )
}  
{!isOwnProfile && (
  <>
    {!isFollowing ? isAuth &&(
      <button className='button' onClick={() => follow()}>
        Follow
      </button>
    ) : (
      <div className='follow-mesage'>siguiendo✔️</div>
    )}
  </>
)}

        {isAuth ? (
          <div>
            {isOwnProfile && (
                  <button className='button' onClick={() => updatePhoto()}>
                  <a className='uploadphoto-but'>subir foto</a>
                </button>
            )}

          </div>
        ) :null
 }
      </div>
      {showUploadPage && (
        <UploadImagesPage onUploadSuccess={handleUploadSuccess} onClose={handleCloseUploadPage}  id={id} />
      )}
      <OpenModal isAuthp={isAuth} isOwnProfilep={isOwnProfile} id={id}></OpenModal>

    </>

  );
};
