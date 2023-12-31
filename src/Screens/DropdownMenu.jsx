import React, { useEffect, useState } from 'react';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../Styles/Drop.css';
import CustomDropdownToggle from './CustomDropdownToggle';  // Ajusta la ruta según tu estructura de carpetas
import 'bootstrap/dist/css/bootstrap.min.css';


const DropdownMenu = ({ post_id, onDeleted, onUpdate ,title}) => {





  const handleEditar = async () => {
    const { value: newText } = await Swal.fire({
      title: 'Editar Texto',
      input: 'textarea',
      inputValue: title,
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        confirmButton: 'custom-swal-confirm', // Clase personalizada para el botón de confirmar
        cancelButton: 'custom-swal-cancel', 
        input: 'input-editar'  // Clase personalizada para el botón de cancelar
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: (text) => {
        return text.trim() !== '' ? text : null;
      },
    });
      
const now= new Date();
console.log('La fecha actual es',now);

    try {
      const response = await axios.put(`https://tatto-backend.onrender.com/editar/${post_id}`, {
        newDescription: newText,
        currentTime: now,
      });
      console.log(response);
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

      onUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEliminar = async () => {
    try {
      const response = await axios.delete(`https://tatto-backend.onrender.com/deleteimages/${post_id}`);
      console.log(response);
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

      // Llamar a la función proporcionada desde el padre para volver a cargar los datos
      onDeleted();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dropdown>
      <div className='drop' >
            <Dropdown.Toggle as={CustomDropdownToggle} style={{ backgroundColor: 'transparent', border: 'none' }} />
      </div>

    <Dropdown.Menu>
      <Dropdown.Item onClick={handleEditar} className='editardrop'>Editar</Dropdown.Item>
      <Dropdown.Item onClick={handleEliminar} className='eliminar'>Eliminar</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  );
};

export default DropdownMenu;
