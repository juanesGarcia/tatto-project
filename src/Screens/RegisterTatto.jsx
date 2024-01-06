import React, { useState, useEffect } from 'react';
import "../Styles/Register.css";
import Swal from 'sweetalert2';
import { onRegistration } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const RegisterTatto = () => {
  const [errores, setErrores] = useState(false);
  const navigate = useNavigate();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    rol: 'tatuador',
    lon: null,
    lat: null,
    phone: ''
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

  const handleCountryCodeChange = async (e) => {
    const countryName = e.target.value;
    setUser({ ...user, countryName });

    try {
      // Obtener información del país desde REST Countries
      const response = await axios.get(`https://restcountries.com/v2/name/${countryName}`);
      const countryData = response.data[0]; // Tomar el primer resultado

      setUser({
        ...user,
        countryFlag: countryData?.flags?.svg || '',
        countryCode: countryData?.alpha2Code || '',
        phone: `+${countryData?.callingCodes[0]}` || '',
      });
    } catch (error) {
      console.error('Error fetching country information:', error);
      setUser({ ...user, countryFlag: '', phone: '', countryCode: '' });
    }
  };

  const handleSummit = async (e) => {
    e.preventDefault();


    const userData = {
      ...user,
      lon: longitude,
      lat: latitude,
      phone: `${user.phone}${user.numberphone}`,
    };

    if(user.password === user.passwordConfirm){
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

    }else{

      Swal.fire({
        title: 'Error',
        text: 'las contraseñas no coinciden ',
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

  const handleOnchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className='containerRegister'>
      <div className="login-box">
        <p>Register</p>
        <form onSubmit={handleSummit}>
          <div className="user-box">
            <input required="" name="name" type="text" onChange={handleOnchange} />
            <label>User Name</label>
          </div>
          <div className="user-box">
            <input required="" name="email" type="text" onChange={handleOnchange} />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input required="" name="password" type="password" onChange={handleOnchange} />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input required="" name="passwordConfirm" type="password" onChange={handleOnchange} />
            <label>Confirm Password</label>
          </div>
          <div className="user-box">
            {/* Nuevo campo para el nombre del país */}
            {user.countryFlag && (
            <div>
              {/* Mostrar la bandera del país */}
              <img src={user.countryFlag} alt="Country Flag" style={{ width: '50px', height: 'auto' }} className='flag'/>
            </div>
          )} 
            <input required="" name="countryName" type="text" placeholder="Country Name" onChange={handleCountryCodeChange} />
          </div>
          <div className="user-box">
            {/* Campo de teléfono */}
            <div className='code'>
                  <input required="" name="phone" type="text" placeholder="code" value={user.phone} onChange={handleOnchange} />
            </div>
        
               <input required="" name="numberphone" type="text" placeholder="Phone Number" onChange={handleOnchange}  className='phone'/>

           
          </div>
       

          <button type='submit'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

