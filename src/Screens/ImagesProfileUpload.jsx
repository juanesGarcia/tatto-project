import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // Asegúrate de importar los estilos de la galería
import "../Styles/ImgProfile.css";
import { BsFillFileImageFill } from "react-icons/bs";
import {  setInfo } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";



const resizeImage = async (file, targetWidth, targetHeight) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      canvas.toBlob((blob) => {
        resolve(blob);
      });
    };
  });
};



const ImagesProfileUpload = ({ onClose, id, users}) => {
  const [images, setImages] = useState([]);
  const [showUploadSection, setShowUploadSection] = useState(true);
  const [imageCount, setImageCount] = useState(0);
  const {info} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  


  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop: useCallback(async (acceptedFiles) => {
        const resolutionMultiplier = 2;
        const resizedImages = await Promise.all(
          acceptedFiles.map(async (file) => {
            const resizedBlob = await resizeImage(
              file,
              800,
              600,
              resolutionMultiplier
            );
            return {
              original: URL.createObjectURL(resizedBlob),
              thumbnail: URL.createObjectURL(resizedBlob),
            };
          })
        );

        setImages(resizedImages);
        // Ocultar la sección de carga después de seleccionar imágenes
        setShowUploadSection(false);
      }, []),
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();


    acceptedFiles.forEach((file, index) => {
      formData.append("photo", file);
    });

    setImageCount(acceptedFiles.length);
    console.log(acceptedFiles.length)

    if(acceptedFiles.length==1){
      try {
        const response = await axios.post(
          `https://backed-tatto.onrender.com/uploadimg/${id}`,
          formData,
        );
        console.log('la url nueva ',response.data.mediaUrl)
        console.log('la anterior',users);
        dispatch(setInfo({ ...info, media_url: response.data.mediaUrl }));
        console.log('Nuevo estado de info:', info); 

        Swal.fire({
          icon: 'success',
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
          },
        });

  
        onClose();

      } catch (error) {
        console.error("Error en la carga:", error);
        Swal.fire({
          icon: 'error',
          title: error,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
          },
        });
    
      }

    }else{
      Swal.fire({
        icon: 'error',
        title: 'solo se puede subir una foto ',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
        },
      });
    }
    onClose();
   

  };

  return (
    <div  style={{ marginLeft: imageCount > 4 ? '1%' : '0%' }}>
      <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="prue">
          {showUploadSection && (
            <div
              {...getRootProps()}
              className="boxUpdate"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <div>
                  <h3 className="text-imgp">arrastre o click para subir imagenes</h3>
                  <BsFillFileImageFill className="icon-imgP"></BsFillFileImageFill>
                </div>
                  
                
                
              )}
            </div>
          )}

          {!showUploadSection && (
            <div className="prue2">
              <div className="container-img">
                <div className="img-comment">
                  <div className="custom-image-gallery2">
                    <ImageGallery items={images} />
                  </div>
                </div>
                <div className="but-upload2">
                  <button className="button">Subir</button>
                  <button className="button" onClick={onClose}>
                    Cerrar
                  </button>
                </div>
              
              </div>
            </div>
            
          )}
          
        </div>
        
      </form>
    </div>
  );
};

export default ImagesProfileUpload;
