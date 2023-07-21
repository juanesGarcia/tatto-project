import React, { useState, useEffect } from 'react';
import '../Styles/Register.css';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { onUpdate, getUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setInfo } from '../redux/slices/authSlice';
export const AdminAccount = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const { info } = useSelector((state) => state.auth);
  const [errores, setErrores] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const data = localStorage.getItem('token');
  const parsedData = JSON.parse(data);

  // Obtener el ID del usuario autenticado desde el token almacenado en localStorage
  const userId = parsedData?.info?.id || '';

  useEffect(() => {
    // Actualizar el estado del usuario solo si parsedData.info existe y no hay datos en el estado user
    if (info && Object.keys(user).every((key) => user[key] === '')) {
      setUser({
        name: info.name,
        email: info.email,
        password: '',
      });
    }
  }, [parsedData.info, user]);

  const handleSummit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      user,
      id: userId,
    };
    try {
      const response = await onUpdate(dataToSend); // Aquí accedemos a la respuesta del backend
      console.log(response);
      if (response.success) {
        setUpdateSuccess(true);
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
    const response1 = await getUser(userId); // Aquí accedemos a la respuesta del backend
    console.log(response1.data.info[0]);
    dispatch(setInfo(response1.data.info[0]));

  };

  const handleOnchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="containerRegister">
      <div className="login-box">
        <p>Update info</p>
        <form onSubmit={handleSummit}>
          <div className="user-box">
            <input
              required=""
              name="name"
              type="text"
              onChange={handleOnchange}
              value={user.name}
            />
            <label>User Name</label>
          </div>
          <div className="user-box">
            <input
              required=""
              name="email"
              type="text"
              onChange={handleOnchange}
              value={user.email}
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              required=""
              name="password"
              type="password"
              onChange={handleOnchange}
              value={user.password}
            />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input required="" name="passwordConfirm" type="password" onChange={handleOnchange} />
            <label>Confirm Password</label>
          </div>

          <div className='containerbut'>
            <button type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              update
            </button>
            <button className='deletebut'>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              delete 
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};
