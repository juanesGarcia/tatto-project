import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  info: null, // Agrega el campo user para almacenar los datos del usuario
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
  },
});

export const { authenticateUser, unauthenticateUser, setInfo } = authSlice.actions;

export default authSlice.reducer;