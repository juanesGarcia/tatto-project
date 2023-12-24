import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // Asegúrate de importar los estilos de la galería
import "../Styles/img.css";
import { BsFillFileImageFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import TextareaAutosize from "react-textarea-autosize";
import { Info } from "@mui/icons-material";

const resizeImage = async (
  file,
  targetWidth,
  targetHeight,
  resolutionMultiplier
) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      // Aumentar la resolución original sin reducir nuevamente
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const increasedWidth = img.width * resolutionMultiplier;
      const increasedHeight = img.height * resolutionMultiplier;

      canvas.width = increasedWidth;
      canvas.height = increasedHeight;

      ctx.drawImage(img, 0, 0, increasedWidth, increasedHeight);

      // Convierte el lienzo redimensionado a Blob para su posterior uso
      canvas.toBlob((blob) => {
        resolve(blob);
      });
    };
  });
};


const ImageUploader = ({ onUploadSuccess, onClose }) => {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [showUploadSection, setShowUploadSection] = useState(true);
  const [imageCount, setImageCount] = useState(0);
  const { isAuth, info } = useSelector((state) => state.auth);

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
    
    const id = info.id
    if (description.length <= 400) {
      formData.append("description", description);
      try {
        const response = await axios.post(
          `http://localhost:4000/upload/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              id: id,
            },
          }
        );

        console.log(response);

        if (onUploadSuccess) {
          onUploadSuccess();
          window.location.reload();

        }
      } catch (error) {
        console.error("Error en la carga:", error);
      }
    } else {
      console.log("error descripcion muy grande");
    }
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
                  <h3 className="text-img">arrastre o click para subir imagenes</h3>
                  <BsFillFileImageFill className="icon-img"></BsFillFileImageFill>
                </div>
                  
                
                
              )}
            </div>
          )}

          {!showUploadSection && (
            <div className="prue2">
              <div className="container-img">
                <div className="img-comment">
                  <div className="custom-image-gallery">
                    <ImageGallery items={images} />
                  </div>
                  <div className="comments-container">
                    <TextareaAutosize
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      minRows={3} // Número mínimo de filas
                      maxRows={10} // Número máximo de filas
                      cols={75}
                      className="textArea"
                      placeholder="Ingresa una descripción para tu post"
                    />
                  </div>
                </div>
                <div className="but-upload">
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

export default ImageUploader;
