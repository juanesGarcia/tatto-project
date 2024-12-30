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

  // Restaurar estado de autenticación desde localStorage cuando la aplicación se carga
  useEffect(() => {
    const authData = localStorage.getItem('authData');
    if (authData) {
      const { token, info } = JSON.parse(authData);
      if (token) {
        dispatch(authenticateUser());
        dispatch(setInfo(info));
      } else {
        dispatch(unauthenticateUser());
      }
    }
  }, [dispatch]);

  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route element={<RestrictedRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path="/HomeAuth" element={<HomeAuth />} />
            <Route path="/AdminAccount" element={<AdminAccount />} />
            <Route path="/TattoStyles" element={<TattoStyles />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/BestTattos" element={<BestTattos />} />
          <Route path="/Artist" element={<Artist />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ChooseRegister" element={<ChooseRegister />} />
          <Route path="/RegisterTatto" element={<RegisterTatto />} />
          <Route path="/profile/:id/:name" element={<UserProfile />} />
          <Route path="/MapaUser" element={<MapaUsers />} />
          <Route path="/AboutMe" element={<AboutMe />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
