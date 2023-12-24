import React, { useEffect, useState } from 'react';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../Styles/Drop.css';
import CustomDropdownToggle from './CustomDropdownToggle';  // Ajusta la ruta según tu estructura de carpetas
import 'bootstrap/dist/css/bootstrap.min.css';


const DropdownMenu = ({ post_id, onDeleted, onUpdate }) => {





  const handleEditar = async () => {
    const { value: newText } = await Swal.fire({
      title: 'Editar Texto',
      input: 'textarea',
      inputLabel: 'Nuevo Texto',
      inputPlaceholder: 'Ingresa el nuevo texto...',
      inputAttributes: {
        'aria-label': 'Nuevo Texto',
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: (text) => {
        return text.trim() !== '' ? text : null;
      },
    });

    try {
      const response = await axios.put(`http://localhost:4000/editar/${post_id}`, {
        newDescription: newText,
      });
      console.log(response);
      Swal.fire({
        icon: 'success',
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });

      onUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEliminar = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/deleteimages/${post_id}`);
      console.log(response);
      Swal.fire({
        icon: 'success',
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500,
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
