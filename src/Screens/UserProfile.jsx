import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "/images/logofinal.jpg";
import Avatar from "@mui/material/Avatar";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaStar } from "react-icons/fa";
import {
  getUser,
  onFollow,
  getFollowed,
  getFollower,
  getStatusFollow,
  onUnFollow,
  getRatingp,
  yetRating,
} from "../api/auth";
import "../Styles/UserProfile.css";
import UploadImagesPage from "./UploadImagePage";
import "react-image-gallery/styles/css/image-gallery.css";
import OpenModal from "./OpenModal";
import FollowerModal from "./FollowerModal";
import FollowedModal from "./FollowedModal";
import LoaderLogo from "./LoaderLogo";
import RatingModal from "./RatingModal";
import StarRating from "./StarRating"; // Ajusta la ruta según la ubicación de tu componente StarRating
import UploadImgProfile  from "./UploadImgProfile"


export const UserProfile = () => {
  const { name, id } = useParams();
  const { isAuth, info, postsLength } = useSelector((state) => state.auth);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [user, setUser] = useState([]);
  const [showUploadPage, setShowUploadPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerLength, setFollowerLength] = useState();
  const [followed, setFollowed] = useState([]);
  const [followedLength, setFollowedLength] = useState();
  const [showFollowedModal, setShowFollowedModal] = useState(false);
  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState(false);
  const [userLocation, setuserLocation] = useState([]);
  const [avarage, setAvarage] = useState([]);
  const [yet, setYet] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const navigate = useNavigate();

  const toggleFollowerModal = () => {
    setShowFollowerModal(!showFollowerModal);
  };

  const toggleFollowedModal = () => {
    setShowFollowedModal(!showFollowedModal);
  };

  const toggleRatingModal = () => {
    setShowRatingModal(!showRatingModal);
  };

  const toggleImages = () => {
    setShowImages(!showImages);
    showData();
  };


  const moveToMap = () =>{
    navigate('/MapaUser')
  }

  const yetRatingf = async () =>{


    const data = {
      rater_user: info.id,
      tatuador_user: id,
    };
    console.log(info.id,id)
    try {
      const response = await yetRating(data);
      const yet = response.data.info || [];
  
      console.log(yet[0].rating_yet)
      setYet(yet[0].rating_yet)
      
  
      
    } catch (error) {
      console.log(error)
    }
  }
  


const getRatingf = async() =>{
    try {
      const response = await getRatingp(id);
      const ratings = response.data.info || [];

  

      if (ratings.length > 0) {
        const averageRating = parseFloat(ratings[0].average_rating).toFixed(1) || 0;
        console.log('Average Rating:', averageRating);
        setAvarage(averageRating)
      } else {
        
          setAvarage(0.0.toFixed(1))
        
      }
    } catch (error) {
      console.log(error);
    }
  }




  const getFollowersf = async () => {
    try {
      const response = await getFollower(id);
      const followersArray = response.data.info || [];
      console.log(followersArray);
      // Guardar el array de seguidores en el estado local
      setFollowers(followersArray);
      console.log(followersArray);
      setFollowerLength(followersArray.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowedf = async () => {
    try {
      const response = await getFollowed(id);
      const followedArray = response.data.info || [];
      console.log("siguiendo a", followedArray);
      // Guardar el array de seguidores en el estado local
      setFollowed(followedArray);
      setFollowedLength(followedArray.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Simula una carga asíncrona (puedes reemplazar esto con tu lógica de carga real)
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Tiempo de simulación de carga: 2 segundos
  }, []);

  const getFollowershow = async () => {
    if (followerLength > 0) {
      toggleFollowerModal();
    }
  };

  

  const getRating = async () => {
      toggleRatingModal();
  };

  const getFollowedshow = async () => {
    if (followedLength > 0) {
      toggleFollowedModal();
    }
  };

  const checkFollowingStatus = async () => {
    console.log("Llamada a checkFollowingStatus");
    console.log(info.id);
    console.log(id);

    try {
      const response = await getStatusFollow({
        follower_id: info.id,
        followed_id: id,
      });

      console.log(response.data.info[0]);
      const { sigue_al_usuario } = response.data.info[0];
      console.log(sigue_al_usuario);

      setIsFollowing(sigue_al_usuario);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuth && name === info.name) {
      setIsOwnProfile(true);
    } else {
      setIsOwnProfile(false);
    }
    if (isAuth) {
      checkFollowingStatus();
    }
    // Espera a obtener los seguidores antes de llamar a showData

      const fetchData = async () => {
        await getFollowersf();
        await getFollowedf();
        await getRatingf();
        if(isAuth){
           await yetRatingf();
        }
       
        showData();
        setDataFetched(true);
      };

      fetchData();
    
  }, [isAuth, id, name, info, postsLength,avarage]);

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
      setIsLoading(false); // Marcar que la carga ha finalizado
    }
  };

  const follow = async () => {
    if (!isFollowing) {
      // Solo seguir si no se está siguiendo ya
      setFollowers([
        ...followers,
        { follower_id: info.id, follower_name: info.name },
      ]);
      setIsFollowing(true);

      const data = {
        follower_id: info.id,
        followed_id: id,
      };

      try {
        // Hacer la solicitud al servidor para seguir al usuario
        const response = await onFollow(data);
        console.log(response);
        getFollowersf();
      } catch (error) {
        console.log(error);
        // En caso de error en la solicitud, revertir los cambios locales
        setFollowers(
          followers.filter((follower) => follower.follower_id !== info.id)
        );
        setIsFollowing(false);
      }
    }
  };

  const unfollow = async () => {
    if (isFollowing) {
      // Solo dejar de seguir si se está siguiendo
      const updatedFollowers = followers.filter(
        (follower) => follower.follower_id !== info.id
      );
      setFollowers(updatedFollowers);
      setIsFollowing(false);

      const data = {
        follower_id: info.id,
        followed_id: id,
      };

      try {
        // Hacer la solicitud al servidor para dejar de seguir al usuario
        const response = await onUnFollow(data);
        console.log(response);
        getFollowersf();
      } catch (error) {
        console.log(error);
        // En caso de error en la solicitud, revertir los cambios locales
        setFollowers([
          ...followers,
          { follower_id: info.id, follower_name: info.name },
        ]);
        setIsFollowing(true);
      }
    }
  };

  useEffect(() => {
    showData();
  }, [id]);

  const parseUserData = (data) => {
    return data.map((item) => {
      const match = item.row.match(/\((.*?),(.*?),(.*?),(.*?),(.*?),(.*?)\)/);
      const avatar = match[6] || "/images/fondo.jpg";
      return {
        name: match[1],
        email: match[2],
        rol: match[3],
        phone: match[4],
        city: match[5],
        avatar: avatar ,
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

  const handleUploadSuccess = async () => {
    try {
      console.log("Imágenes subidas con éxito desde ImageUploader");
      setShowUploadPage(false);

      // Realiza una actualización más eficiente utilizando el estado local
      setUploadedPhoto(true);
    } catch (error) {
      console.error("Error al procesar la carga de imágenes:", error);
    }
  };

  const handleCloseUploadPage = () => {
    setShowUploadPage(false);
  };

 const getuploadImage =()=>{
  toggleImages()
 }
  
  
  return (
    <>
      {isLoading && <LoaderLogo></LoaderLogo>}
      {user.length > 0 && (
        <div>
          <div className="containerProfile">
            <Avatar
              src={user[0].avatar}
              sx={{ width: 140, height: 140 }}
              className="img-avatar"
              onClick={() => getuploadImage()}
            ></Avatar>
               {showImages && isAuth && isOwnProfile &&(
                <UploadImgProfile onClose={toggleImages} id={id}></UploadImgProfile>
          )}
            <div className="containerInfo">
              <h6 className="nameinfo"> {user[0].name} </h6>
              <h6>{user[0].rol}</h6>
              <h6>{user[0].city}</h6>
          
              {user.length > 0 && user[0].rol === "tatuador" && (
                 <h6><StarRating rating={avarage} /> {avarage}</h6>
              )
             
              }
        
              {user.length > 0 && user[0].rol === "tatuador" && isOwnProfile && (
      
      <div className="location" onClick={() => moveToMap()}>
      agregar ubicacion de tu local<FaMapMarkerAlt  className="iconmap" size={30} color="red" style={{marginBottom:"4px"}}></FaMapMarkerAlt>
     </div>

        )}
                  {user.length > 0 && user[0].rol === "tatuador" && !isOwnProfile && isAuth && !yet && (
 
  <h6 className="rating" onClick={() => getRating()}>califica al tatuador</h6>

        )}
        {user.length>0 && showRatingModal &&(
          <RatingModal onClose={toggleRatingModal} id={id} info={info.id} getRatingf={getRatingf}/>
        )

        }
      
            </div>
          </div>
          <div className="followInfo">
            <h6>publicaciones {postsLength}</h6>
            <h6 className="follow" onClick={() => getFollowershow()}>
              seguidores {followerLength}
            </h6>
            <h6 className="follow" onClick={() => getFollowedshow()}>
              seguidos {followedLength}
            </h6>
          </div>
          {/* Renderizar el modal de seguidores */}
          {showFollowerModal && (
            <FollowerModal
              followers={followers}
              onClose={toggleFollowerModal}
            />
          )}
          {showFollowedModal && (
            <FollowedModal followed={followed} onClose={toggleFollowedModal} />
          )}
        </div>
      )}

      <div className="buttonPerfil">
        {user.length > 0 && user[0].rol === "tatuador" && !isOwnProfile && (
          
          <button className="button">
            <a
              href={`https://wa.me/${user[0].phone}?text=Hola%20${name},%0A%0AEstoy%20interesado%20en%20obtener%20información%20sobre%20los%20precios%20de%20los%20tatuajes%20y%20discutir%20la%20posibilidad%20de%20programar%20una%20cita%20contigo.%20¿Podrías%20proporcionarme%20más%20detalles%20sobre%20tus%20servicios%20y%20disponibilidad?%0A%0AGracias`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp"
            >
              Whatsapp
            </a>
          </button>

        )}
        {!isOwnProfile && (
          <>
            {!isFollowing ? (
              isAuth && (
                <button className="button" onClick={() => follow()}>
                  Follow
                </button>
              )
            ) : (
              <button className="button" onClick={() => unfollow()}>
                siguiendo✔️
              </button>
            )}
          </>
        )}

        {isAuth ? (
          <div>
            {isOwnProfile && (
              <button className="button" onClick={() => updatePhoto()}>
                <a className="uploadphoto-but">subir foto</a>
              </button>
            )}
          </div>
        ) : null}
      </div>
      {showUploadPage && (
        <UploadImagesPage
          onUploadSuccess={handleUploadSuccess}
          onClose={handleCloseUploadPage}
          id={id}
        />
      )}
      <OpenModal
        isAuthp={isAuth}
        isOwnProfilep={isOwnProfile}
        id={id}
        info={info}
        uploadedPhoto={uploadedPhoto}
        setUploadedPhoto={setUploadedPhoto}
      ></OpenModal>
      <h6>{userLocation[0]}</h6>
    </>
  );
};
