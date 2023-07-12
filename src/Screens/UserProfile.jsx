import React from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authenticateUser, setInfo ,unauthenticateUser} from '../redux/slices/authSlice';

import { useSelector } from "react-redux";
export const UserProfile = () => {
  const {id,name} = useParams();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const { info } = useSelector((state) => state.auth);


  console.log(name)


  return (
    <div>

      <h1>User Profile</h1>
      <h1>Value: {name}
</h1>
<h2>id: {id}</h2>

      {isAuth ? (
        <div>
          <button><NavLink to="/AdminAccount">tocar</NavLink></button>
        </div>



      ):(
<div>no logeado </div>

      )}

    </div>
  );
};
