import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  info: null, // Agrega el campo user para almacenar los datos del usuario
  postsLength: 0, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser: (state) => {
      state.isAuth = true;
    },
    unauthenticateUser: (state) => {
      state.isAuth = false;
      state.info = null; // Reinicia los datos del usuario al cerrar sesión
    },
    setInfo: (state, action) => {
      state.info = action.payload; // Almacena los datos del usuario en el estado
    },
    setPostsLength: (state, action) => {
      state.postsLength = action.payload;  // Almacena la longitud de los posts en el estado
    },
  },
});

export const { authenticateUser, unauthenticateUser, setInfo ,setPostsLength } = authSlice.actions;

export default authSlice.reducer;