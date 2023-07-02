import React from 'react'
import "../Styles/Login.css"
import { NavLink } from "react-router-dom";
export const Login = () => {
  return (
    <div className='containerLogin'>
      <div className="login-box">
        <p>Login</p>
        <form>
          <div className="user-box">
            <input required="" name="" type="text" />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input required="" name="" type="password" />
            <label>Password</label>
          </div>
          <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
        </form>
        <p>Don't have an account? <NavLink className="a2" to="/Register">Sign up!</NavLink> </p>
      </div>
    </div>

  )
}
