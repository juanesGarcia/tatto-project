import NavBar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Home } from "./Screens/Home";
import { Login } from "./Screens/Login";
import { BestTattos } from "./Screens/BestTattos";
import { Artist } from "./Screens/Artist";
import { Blog } from "./Screens/Blog";
import { Register } from "./Screens/Register";
import { Footer } from "./Components/Footer";
import { ChooseRegister } from "./Screens/ChooseRegister";
import { RegisterTatto } from "./Screens/RegisterTatto";
import { useSelector, useDispatch } from "react-redux";
import { HomeAuth } from "./Screens/HomeAuth";
import { UserProfile } from "./Screens/UserProfile";
import { AdminAccount } from "./Screens/AdminAccount";
import { Error } from "./Screens/Error";
import { checkSession } from "./api/session";
import { useEffect } from "react";
import { authenticateUser, setInfo, unauthenticateUser } from './redux/slices/authSlice';
import { MapaUsers } from "./Screens/MapaUsers";
import { AboutMe } from "./Screens/AboutMe";
import { TattoStyles } from "./Screens/TattoStyles";

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return <>{!isAuth ? <Outlet /> : <Navigate to="/" />}</>;
};

function App() {
  const dispatch = useDispatch();
  const { isAuth, info } = useSelector((state) => state.auth);

  // Guardar estado de autenticación en localStorage cada vez que cambia
  useEffect(() => {
    if (isAuth) {
      localStorage.setItem('authData', JSON.stringify({ isAuth, info }));
    } else {
      localStorage.removeItem('authData');
    }
  }, [isAuth, info]);

  // Restaurar estado de autenticación desde localStorage cuando la aplicación se carga
  useEffect(() => {
    const authData = localStorage.getItem('authData');
    if (authData) {
      const { isAuth: storedIsAuth, info: storedInfo } = JSON.parse(authData);
      if (storedIsAuth) {
        dispatch(authenticateUser());
        dispatch(setInfo(storedInfo));
      } else {
        dispatch(unauthenticateUser());
      }
    }
  }, [dispatch]);

  // Verificar la sesión del usuario
  useEffect(() => {
    checkSession(dispatch);
  }, [dispatch]);

  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route element={<RestrictedRoutes />}>
            <Route exact path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/HomeAuth" element={<HomeAuth />} />
            <Route exact path="/AdminAccount" element={<AdminAccount />} />
            <Route exact path="/TattoStyles" element={<TattoStyles />} />
          </Route>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/BestTattos" element={<BestTattos />} />
          <Route exact path="/Artist" element={<Artist />} />
          <Route exact path="/Blog" element={<Blog />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/ChooseRegister" element={<ChooseRegister />} />
          <Route exact path="/RegisterTatto" element={<RegisterTatto />} />
          <Route exact path="/profile/:id/:name" element={<UserProfile />} info={info} />
          <Route exact path="/MapaUser" element={<MapaUsers />} />
          <Route exact path="/AboutMe" element={<AboutMe />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
