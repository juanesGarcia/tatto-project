import { createSlice } from '@reduxjs/toolkit'


const LocalStorage =() =>{
  const isAuth = localStorage.getItem('isAuth')

  if(isAuth && JSON.parse(isAuth)===true){
    return true
  }
  
  return false
}
const initialState = {
    isAuth: LocalStorage(),
  }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   authenticateUser:(state)=>{
    state.isAuth=true
   },
   unauthenticateUser:(state)=>{
    state.isAuth=false
   }
  }
})

// Action creators are generated for each case reducer function
export const {authenticateUser,unauthenticateUser} = authSlice.actions

export default authSlice.reducer