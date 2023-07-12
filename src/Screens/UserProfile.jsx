import React from 'react';
import { useParams, useSearchParams} from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authenticateUser, setInfo, unauthenticateUser } from '../redux/slices/authSlice';
import { useSelector } from "react-redux";
export const UserProfile = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const { info } = useSelector((state) => state.auth);
  const userId = localStorage.getItem("userId");


 

  console.log(userId)

  return (
    <div>

      <h1>User Profile</h1>
      <h1>Value: {name}
      </h1>


      {isAuth ? (

        <div>
          <button><NavLink to="/AdminAccount">tocar</NavLink></button> 
          <h2>id: {info.id}</h2>
        </div>



      ) : (
        <div>
          <h2>id:{userId} </h2>
          <h1>no logeado </h1>
        </div>

      )}

    </div>
  );
};
