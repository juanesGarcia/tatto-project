import React, { useState } from 'react'
import "../Styles/Register.css"
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2'
import { onRegistration } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [errores, setErrores] = useState(false)
  const [user, setUser] = useState({
    name:'',
    email:'',
    password:'',
  });
  const navigate = useNavigate();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSummit = async (e) => {
    e.preventDefault();
    try {
      const response = await onRegistration(user);
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
