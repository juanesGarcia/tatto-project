
import { useState, useEffect } from 'react';
import axios from 'axios';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import '../Styles/OpenModal.css';
import DropdownMenu from './DropdownMenu'; 
import 'react-image-gallery/styles/css/image-gallery.css';






const OpenModal = ({isAuthp, isOwnProfilep, id}) => {

    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);


  
    
  
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
        console.log(data)
        setPosts(parseImageData(data));
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      showData();
    }, []);
  
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
    <p>No hay posts disponibles.</p>
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
                onToggleMenu={onToggleMenu}
              />
    
            )}

          </div>
        ) : null}
    

             
         
       
              
            </div>
            <div className="info">{selectedPost.title}</div>
            <div className="custom-gallery">
              <Gallery items={selectedPost.photos} />
            </div>
            <div className="info">{selectedPost.created_at}</div>
          </div>
        </div>
      )}



     

    </>
  )
}
export default OpenModal;