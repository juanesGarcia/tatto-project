import React, { useState } from 'react'
import "../Styles/Login.css"
import { NavLink } from "react-router-dom";
import { onLogin } from '../api/auth';
import { useDispatch } from 'react-redux';
import { authenticateUser, setInfo } from '../redux/slices/authSlice';

export const Login = () => {
  const [errores, setErrores] = useState(false)
  const [user, setUser] = useState({
    email:'',
    password:'',
  });

  const dispatch=useDispatch();
  
  const handleSummit =async(e)=>{
    e.preventDefault();
    try {
       const infoUser = await onLogin(user) ;
       console.log(infoUser); 
       console.log(infoUser.data.info); 
       
       dispatch(authenticateUser());
       dispatch(setInfo(infoUser.data.info));
       localStorage.setItem('isAuth','true');
       localStorage.setItem('token',JSON.stringify(infoUser) );
       localStorage.setItem('authData', JSON.stringify({ isAuth, info }));

       
    } catch (error) {
      setErrores(error.response.data.errors[0]);
      console.log(error.response.data.errors[0]);
    }
  }
  const handleOnchange =(e)=>{
    setUser({...user,[e.target.name]:e.target.value})

  }
  return (
    <div className='containerLogin'>
      <div className="login-boxLogin">
        <p>Login</p>
        <form onSubmit={handleSummit}>
          <div className="user-boxLogin">
            <input required="" name="email" type="text" onChange={handleOnchange}/>
            <label className='label'>Email</label>
          </div>   
          <div className="user-boxLogin">
            <input required="" name="password" type="password" onChange={handleOnchange}/>
            <label>Password</label>
          </div>
          <button type='submit'>
          
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit

          </button>
          <div style={{color:'red',margin:'10px 0'}}>{errores}</div>
          
        </form>
        <p>Don't have an account? <NavLink className="a2" to="/ChooseRegister">Sign up!</NavLink> </p>
      </div>
    </div>

  )
}
