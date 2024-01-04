
  import { useState, useEffect } from 'react';
  import axios from 'axios';
  import Gallery from 'react-image-gallery';
  import 'react-image-gallery/styles/css/image-gallery.css';
  import '../Styles/OpenModal.css';
  import DropdownMenu from './DropdownMenu'; 
  import 'react-image-gallery/styles/css/image-gallery.css';
  import { useDispatch } from 'react-redux';
  import { setPostsLength } from '../redux/slices/authSlice';
  import { FaStar, FaRegStar } from 'react-icons/fa';
  import { onReaction , getStatusReactions, unReaction, getReactions} from '../api/auth';
  import Avatar from "@mui/material/Avatar";



  const OpenModal = ({isAuthp, isOwnProfilep, id,info}) => {

      const [posts, setPosts] = useState([]);
      const [selectedPost, setSelectedPost] = useState(null);
      const [isStarred, setIsStarred] = useState(false);
      const [likeAnimation, setLikeAnimation] = useState(false);
      const [reactionsMap, setReactionsMap] = useState({});
      const [userReactions, setuserReactions] = useState([])

      const dispatch = useDispatch();


      const getReactionsp = async(post_id)=>{
        console.log(post_id)

        try {
          const response = await getReactions(post_id)
          const followersArray = response.data.info || [];
          console.log(followersArray)
          setuserReactions(followersArray)

          
        } catch (error) {
          
        }
      }

      const checkreactions = async () => {
        if (!isAuthp) {
          // Si el usuario no está autenticado, muestra un mensaje o realiza alguna acción
          console.log('Usuario no autenticado. No se puede dar like.');
          return;
        }
      
        try {
          const response = await getStatusReactions({
            reactor_id: info.id,
            post_id:selectedPost.post_id
          });
      
          console.log(response);
          const {reaction_count} = response.data.info[0]
          console.log(reaction_count)
          setReactionsMap((prevReactionsMap) => ({
            ...prevReactionsMap,
            [selectedPost.post_id]: reaction_count > 0,
          }));
      
        } catch (error) {
          console.log(error);
        }
      };

      const handleStarClick = async (post_id) => {
        try {
          if (!isAuthp) {
            // Si el usuario no está autenticado, muestra un mensaje o realiza alguna acción
            console.log('Usuario no autenticado. No se puede dar like.');
            return;
          }
          if (reactionsMap[post_id]) {
            // Si ya hay una reacción, realiza la acción de "unReaction"
            await unReaction({
              reactor_id: info.id,
              post_id,
            });
          } else {
            // Si no hay una reacción, realiza la acción de "onReaction"
            await onReaction({
              reactor_id: info.id,
              reacted_to_user_id: id,
              post_id,
              reaction_type: 'start',
            });
          }
    
          // Actualiza el estado de las reacciones después de realizar la acción
          checkreactions();
          getReactionsp(post_id);
        } catch (error) {
          console.error(error);
        }
      };

      /*const handleStarClickPhoto = () => {


        setIsStarred((prevIsStarred) => !prevIsStarred);
        setLikeAnimation(true);
      
        // Desactivar la animación después de un tiempo (puedes ajustar el tiempo según tus necesidades)
        setTimeout(() => {
          setLikeAnimation(false);
        }, 1000);
      };*/

      const parseImageData = (data) => {
        if (!data || typeof data !== 'object' || !data.posts) {
          console.error('La respuesta del servidor no tiene la estructura esperada:', data);
          return [];
        }
    
        const { user_id, posts } = data;
    
        if (!Array.isArray(posts)) {
          console.error('La propiedad "posts" no es un array en la respuesta del servidor:', data);
          return [];
        }
    
        return posts.map((post) => {
          const { post_id, title, photos,created_at } = post;
          const parsedPhotos = Array.isArray(photos)
            ? photos.map((photo) => {
                const { photo_id, name, media_url } = photo;
                return {
                  id: photo_id,
                  name,
                  original: media_url, // Agregamos una propiedad "original" para react-image-gallery
                };
              })
            : [];
    
          return {
            user_id,
            post_id,
            title,
            photos: parsedPhotos,
            created_at
          };
        });
      };
      const showData = async () => {
        try {
          const response = await axios.get(`https://tatto-backend.onrender.com/getimages/${id}`);
          
          const data = response.data.info;
          console.log(data);
      
          // Establecer posts a un array vacío y post.length a 0 si data.posts no es un array o está vacío
          const sortedPosts = Array.isArray(data.posts) && data.posts.length > 0
            ? parseImageData(data).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            : [];
      
          setPosts(sortedPosts);
          console.log(sortedPosts.length);
      
          // Establecer post.length a 0 si data.posts no es un array o está vacío
          dispatch(setPostsLength(Array.isArray(data.posts) ? data.posts.length : 0));
      
          console.log(posts.length);
        } catch (error) {
          console.log(error);
        }
      };
      
    
      useEffect(() => {
        if (selectedPost) {
          checkreactions();
          getReactionsp(selectedPost.post_id);
        }
        showData();
      }, [id,posts.length,selectedPost]);
    
      const openModal = (post) => {
          console.log('was open')
        setSelectedPost(post);
      };
    
      const closeModal = () => {
          console.log('was close')
        setSelectedPost(null);
      };
      const handleDeleted = async() => {
        await showData();
        closeModal() ;
        setPosts((prevPosts) => prevPosts.filter((p) => p.post_id !== selectedPost.post_id));
        
      };
      const handleUpdate = async() => {
        await showData();
        closeModal() ;
        
      };
      const onToggleMenu = (e) => {
        // Prevenir la propagación del evento click para evitar cerrar el modal
        e.stopPropagation();
      };

      const calcularDiferenciaEnDias = (fecha) => {
        const fechaActual = new Date();  // Obtiene la fecha actual
        const fechaDada = new Date(fecha);  // Tu fecha dada
      
        // Calcula la diferencia en milisegundos
        const diferenciaMilisegundos = fechaActual - fechaDada;
      
        // Convierte la diferencia a días
        const diferenciaDias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);
      
        const diasRedondeados= Math.round(diferenciaDias);  // Redondea el resultado a días enteros
        return diasRedondeados === 1
        ? `${diasRedondeados} día`
        : `${diasRedondeados} días`;
      };
    
    return (
      <>
      <div className="post-grid">
    {posts.length > 0 ? (
      posts.map((post) => (
        <div key={post.post_id} className="post-item" onClick={() => openModal(post)}>
          {post.photos.length > 0 && (
            <img src={post.photos[0].original} alt={post.photos[0].name} />
          )}
        </div>
      ))
    ) : (
      <div className='no-post'>No hay posts disponibles.</div>
    )}
  </div>
  {selectedPost && (
          <div className="custom-modal-overlay" onClick={closeModal}>
            <div className="custom-modal" onClick={onToggleMenu}>
              <div className="close-button" onClick={closeModal}>
                x
              </div>
              <div>
              {isAuthp ? (
            <div>
              {isOwnProfilep && (
                      <DropdownMenu
                  post_id={selectedPost.post_id}
                  onDeleted={handleDeleted}
                  onUpdate={handleUpdate}
                  title={selectedPost.title}
                  onToggleMenu={onToggleMenu}
                />
      
              )}

            </div>
          ) : null}

                
              </div>
              <div className="info">{selectedPost.title}</div>
              <div className={`custom-gallery ${likeAnimation ? 'like-animation' : ''}`} >
                <Gallery className={`${likeAnimation ? 'like-animation' : ''}`} items={selectedPost.photos} />
                <div onClick={() => handleStarClick(selectedPost.post_id)}  style={{ fontSize: '24px' }}>
                {reactionsMap[selectedPost.post_id] ? <FaStar color="gold" /> : <FaRegStar />}
        </div>
              </div>

              <div className='info-users-reactions'>
                    {userReactions.map((user) => (
              <div className='user-reactions'  key={user.id}><Avatar sx={{ width: 25, height: 25 }}>{user.name[0].toUpperCase()}</Avatar><div className='nameuser'>{user.name}</div></div>
            ))}
              </div>
          

              
      
              <div className="info">Creado hace {
              calcularDiferenciaEnDias(selectedPost.created_at)}</div>
            </div>
          </div>
        )}



      

      </>
    )
  }
  export default OpenModal;
