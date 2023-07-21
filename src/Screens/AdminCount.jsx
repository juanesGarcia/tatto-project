import React, { useState } from 'react'
import "../Styles/Register.css"
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2'
import { onUpdate } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export const AdminCount = () => {
  const [errores, setErrores] = useState(false)
  const [user, setUser] = useState({
    name:'',
    email:'',
    password:'',
  });
  const navigate = useNavigate();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const data = localStorage.getItem('token');
  const parsedData = JSON.parse(data);

  // Obtener el ID del usuario autenticado desde el token almacenado en localStorage
  const userId = parsedData?.info?.id || '';
console.log(userId)

const handleSummit = async (e) => {
  e.preventDefault();
  const dataToSend = {
    user,
    id: userId,
  };
  try {
    const response = await onUpdate(dataToSend);
    const responseData = response.data; // Aquí accedemos a la respuesta del backend
    console.log(responseData);
    if (responseData.success) {
      setRegistrationSuccess(true);
      navigate('/login'); // Redirigir al inicio de sesión
    }
  } catch (error) {
    // Aquí verificamos si la respuesta del backend contiene el campo 'error' para mostrar el mensaje de error
    if (error.response?.data?.error) {
      setErrores(error.response.data.error);
      console.log(error.response.data.error);
      Swal.fire({
        title: 'Error',
        text: errores,
        icon: 'error',
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          confirmButton: 'custom-swal-confirm-button',
        },
        buttonsStyling: false,
      });
    } else {
      // Si no se encuentra el campo 'error', mostramos un mensaje genérico de error
      setErrores('Ocurrió un error en el servidor.');
      console.log('Ocurrió un error en el servidor.');
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error en el servidor.',
        icon: 'error',
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          confirmButton: 'custom-swal-confirm-button',
        },
        buttonsStyling: false,
      });
    }
  }
};

  const handleOnchange =(e)=>{
    setUser({...user,[e.target.name]:e.target.value})

  }
  
  
    return (
        <div className='containerRegister'>
            <div className="login-box">
        <p>Register</p>
        <form onSubmit={handleSummit}>
          <div className="user-box">
            <input required="" name="name" type="text" onChange={handleOnchange} defaultValue={parsedData.info.name}/>
            <label>User Name</label>
          </div>
          <div className="user-box">
            <input required="" name="email" type="text" onChange={handleOnchange} defaultValue={parsedData.info.email}/>
            <label>Email</label>
          </div>
          <div className="user-box">
            <input required="" name="password" type="password" onChange={handleOnchange}/>
            <label>Password</label>
          </div>
          <div className="user-box">
            <input required="" name="passwordConfirm" type="password" onChange={handleOnchange}/>
            <label>Comfirm Password</label>
          </div>
          
          <button type='submit'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Summit
          </button>
        </form>
      </div>
        </div>

    )
}
