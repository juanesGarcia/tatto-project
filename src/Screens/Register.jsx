import React from 'react'
import "../Styles/Register.css"
import { NavLink } from "react-router-dom";
export const Register = () => {
    return (
        <div className='containerRegister'>
            <div className="login-box">
        <p>Register</p>
        <form>
          <div className="user-box">
            <input required="" name="" type="text" />
            <label>User Name</label>
          </div>
          <div className="user-box">
            <input required="" name="" type="text" />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input required="" name="" type="password" />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input required="" name="" type="password" />
            <label>Comfirm Password</label>
          </div>
          
          <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
        </form>
      </div>
        </div>

    )
}
