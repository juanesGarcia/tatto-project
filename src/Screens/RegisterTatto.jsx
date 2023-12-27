import React, { useState, useEffect } from 'react'
import "../Styles/Register.css"
import Swal from 'sweetalert2'
import { onRegistration } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export const RegisterTatto = () => {
  const [errores, setErrores] = useState(false)
  const navigate = useNavigate();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [user, setUser] = useState({
    name:'',
    email:'',
    password:'',
    rol:'tatuador',
    lon:null,
    lat:null,
  });

  useEffect(() => {
    // Verificar si el navegador admite la geolocalización
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }, []);

  const handleSummit = async (e) => {
    e.preventDefault();
    const userData = {
      ...user,
      lon: longitude,
      lat: latitude,
    };
    try {
      const response = await onRegistration(userData);
      console.log(response);
      if (response.data.success) {
        setRegistrationSuccess(true);
        navigate('/login'); // Redirigir al inicio de sesión
      }
    } catch (error) {
      setErrores(error.response.data.errors[0]);
      console.log(error.response.data.errors[0]);
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
            <input required="" name="name" type="text" onChange={handleOnchange}/>
            <label>User Name</label>
          </div>
          <div className="user-box">
            <input required="" name="email" type="text" onChange={handleOnchange} />
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
          <div className="user-box">
            <input required="" name="phone" type="text" onChange={handleOnchange}/>
            <label>Phone</label>
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
