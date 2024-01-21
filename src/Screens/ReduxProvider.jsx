// app/ReduxProvider.js
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../redux/slices/authSlice'; // Ajusta la ruta según tu estructura de carpetas

const store = configureStore({
  reducer: rootReducer,
  // Otros configuraciones de middleware, etc., según sea necesario
});

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
