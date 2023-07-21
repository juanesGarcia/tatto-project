import axios from 'axios';
import { authenticateUser, unauthenticateUser } from '../redux/slices/authSlice';
import { onLogout } from "../api/auth";
import { useDispatch, useSelector } from "react-redux";
// Función para verificar la validez del token en el backend
export const verifyToken = async (token) => {
  console.log(token)
  try {
    const response = await axios.post('http://localhost:4000/verify-token', { token });
    const { isValid } = response.data;
    return isValid;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Función para mantener la sesión abierta al recargar la página
export const checkSession = async (dispatch) => {
    const localStorageValue = window.localStorage.getItem('token');
  const parsedValue = JSON.parse(localStorageValue);
  const token = parsedValue?.token; 
  
  if (token) {
    const isValid = await verifyToken(token);
    console.log(isValid);
    if (isValid) {
      // El token es válido, autenticar al usuario en el frontend (mantener la sesión abierta)
      dispatch(authenticateUser());
    } else {
      // El token no es válido, cerrar la sesión en el frontend (eliminar el token del almacenamiento local)
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem('token');
      localStorage.removeItem('authData');
    }
  } else {
    // No hay token en el almacenamiento local, cerrar la sesión en el frontend
    await onLogout();
    dispatch(unauthenticateUser());
    localStorage.removeItem('token');
    localStorage.removeItem('authData');
  }
  };
  