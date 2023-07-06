import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fechProtectedInfo, onLogout } from '../api/auth';
import { unauthenticateUser } from '../redux/slices/authSlice';
import { Loaders } from "./Loaders";
import "../Styles/HomeAuth.css";

export const HomeAuth = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [protectedData, setProtectedData] = useState(null)

    const logout = async()=>{
      try {
        await onLogout();
        dispatch(unauthenticateUser())
        localStorage.removeItem('isAuth');
        
      } catch (error) {
        console.log(error.reponse)
      }
    }

    const protectedInfo = async()=>{
        try {
            const{ data }= await fechProtectedInfo();
            setProtectedData(data.info)
            setLoading(false)
          
        } catch (error) {
          logout()
        }
      }

      useEffect(() => {
        protectedInfo();
      }, [])
      
  return loading ?(
    <div className='loader'>
      <Loaders></Loaders>
    
    </div>
        
  ):(
    <div>
    <h1>HomeAuth</h1>
    <h2>{protectedData}</h2>
    <button onClick={()=>logout()}>
        Logout
    </button>
    </div>
  
  )
}
