import React, { useState, useEffect } from 'react';
import '../Styles/AdminAccount.css';
import Swal from 'sweetalert2';
import { onUpdate, getUserInfo, onDelete, onLogout } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setInfo } from '../redux/slices/authSlice';
import { unauthenticateUser } from "../redux/slices/authSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";


export const AdminAccount = () => { 
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    name: '',
    password: '',
    passwordConfirm: '',
    showPassword: false,
    showConfirmPassword: false,
  });
  
  const navigate = useNavigate();
  const [ UpdateSuccess ,setUpdateSuccess] = useState(false);
  const data = localStorage.getItem('authData');
  const parsedData = JSON.parse(data);
  

  // Obtener el ID del usuario autenticado desde el token almacenado en localStorage
  const userId = parsedData?.info?.id || '';
console.log(info)
  useEffect(() => {
    // Actualizar el estado del usuario solo si parsedData.info existe y no hay datos en el estado user
    if (info && Object.keys(user).every((key) => user[key] === '')) {
      setUser({
        name: info.name,
        password: '',
      });
    }
  }, [parsedData.info, user]);

  const handleOnchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setUser((prevUser) => ({
      ...prevUser,
      showPassword: !prevUser.showPassword,
    }));
  };

  const toggleShowConfirmPassword = () => {
    setUser((prevUser) => ({
      ...prevUser,
      showConfirmPassword: !prevUser.showConfirmPassword,
    }));
  };

  const handleSummit = async (e) => {
    e.preventDefault();
       // Validar que las contraseñas coinciden
       if (user.password !== user.passwordConfirm) {
        Swal.fire({
          title: 'Error',
          text: 'Las contraseñas no coinciden',
          icon: 'error',
          customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            confirmButton: 'custom-swal-confirm-button',
          },
          buttonsStyling: false,
        });
        return; // Detener el envío si las contraseñas no coinciden
      }
console.log('joda',parsedData.token)
    const dataToSend = {
      user,
      id: userId,
      token:parsedData.token
    };
  
    try {
      const response = await onUpdate(dataToSend); // Aquí accedemos a la respuesta del backend
      console.log(response);
      if (response.success) {
        setUpdateSuccess(true);
        Swal.fire({
          icon: 'success',
          title: 'Se guardó la actualización de los datos correctamente 😊',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
          },
        }).then(() => {
          navigate('/'); // Espera a que el Swal se cierre antes de navegar
        });
      }
      
    } catch (error) {
    
      Swal.fire({
        title: 'Error',
        text: "error",
        icon: 'error',
        timer: 2500,
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          confirmButton: 'custom-swal-confirm-button',
        },
        buttonsStyling: false,
      });
    }

    console.log(userId)

    const response1 = await getUserInfo(userId); // Aquí accedemos a la respuesta del backen
    
    console.log(response1.data[0].name)
    dispatch(setInfo({ ...info, name: response1.data[0].name}));

  };


  
  const handleOnLogout = async () =>{
    await onLogout();
        dispatch(unauthenticateUser())
        localStorage.removeItem('token');
        localStorage.removeItem('authData');
        navigate('/');
  }

 const handleDelete = async (e)=>{
  e.preventDefault();
  const swalWithBootstrapButtons = Swal.mixin({
    buttonsStyling: false,
    customClass: {
      confirmButton: 'btn success', // Clase para el botón de confirmación (Yes)
      cancelButton: 'btn danger',  // Clase para el botón de cancelación (No)
    },
    showClass: {
      popup: 'swal2-show',             // Clase para el contenedor del SweetAlert
      backdrop: 'swal2-backdrop-show', // Clase para el fondo oscuro detrás del SweetAlert
    },
    hideClass: {
      popup: 'swal2-hide',             // Clase para el contenedor del SweetAlert
      backdrop: 'swal2-backdrop-hide', // Clase para el fondo oscuro detrás del SweetAlert
    },
  });
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'delete Account',
    cancelButtonText: 'cancel!',
    reverseButtons: true,
    background: '#000',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const data = {
        id: userId,
        token:parsedData.token
      };
      try {
        await onDelete(data);
  
        swalWithBootstrapButtons.fire({
          background: '#000',
          text: 'Your account has been deleted.',
          icon: 'success',
        }
        ).then(() => {
          // Llamar a handleOnLogout solo después de la confirmación de eliminación
          handleOnLogout();
        });
  
      } catch (error) {
        swalWithBootstrapButtons.fire(
          { error },
        )
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
          background: '#000',
          text: 'Your account is safe :)',
          icon: 'success',
          customClass: {
            confirmButton: 'btn danger', // Clase personalizada para el botón de confirmación (éxito)
          },
        },
        
      )
    }
  });
  
 }
  return (
    <div className="containerUpdate">
    <div className="login-box2">
      <p>Actualizar</p>
      <form onSubmit={handleSummit}>
        <div className="user-box">
          <input
            name="name"
            type="text"
            onChange={handleOnchange}
            value={user.name}
            className='input'
            placeholder={info.name}

          />
           <label className='label'>Nombre De Usuario</label>
        </div>
        <div className="user-box">
          <input
            required=""
            name="password"
            type={user.showPassword ? 'text' : 'password'}
            onChange={handleOnchange}
            value={user.password}
            className='input'
          />
          <label  className='label'>Contraseña</label>
          {user.showPassword ? (
            <VisibilityIcon
              onClick={toggleShowPassword}
              className="visibility-right2"
            />
          ) : (
            <VisibilityOffIcon
              onClick={toggleShowPassword}
              className="visibility-right2"
            />
          )}
        </div>
        <div className="user-box">
          <input
            required=""
            name="passwordConfirm"
            type={user.showConfirmPassword ? 'text' : 'password'}
            onChange={handleOnchange}
            value={user.passwordConfirm}
            className='input'
          />
          <label  className='label'>Confirma La Contraseña</label>
          {user.showConfirmPassword ? (
            <VisibilityIcon
              onClick={toggleShowConfirmPassword}
              className="visibility-right2"
            />
          ) : (
            <VisibilityOffIcon
              onClick={toggleShowConfirmPassword}
              className="visibility-right2"
            />
          )}
        </div>


          <div className='containerbut'>
            <button type="submit" className='actualiza'>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Actualiza
            </button>
            <button className='deletebut' onClick={handleDelete}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Elimina 
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};
