import React, { useEffect, useState } from 'react'
import { fechProtectedInfo, onLogout } from '../api/auth';
import "../Styles/HomeAuth.css";

export const HomeAuth = () => {

    const [loading, setLoading] = useState(true);
    const [protectedData, setProtectedData] = useState(null)


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
 
    </div>
  
  
  )
}
