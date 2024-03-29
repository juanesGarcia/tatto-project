import NavBar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import{ Home } from "./Screens/Home"
import{ Login } from "./Screens/Login"
import{ BestTattos } from "./Screens/BestTattos"
import{ Artist } from "./Screens/Artist"
import{ Blog } from "./Screens/Blog"
import{ Register } from "./Screens/Register"
import{ Footer } from "./Components/Footer"
import{ ChooseRegister } from "./Screens/ChooseRegister"
import{ RegisterTatto } from "./Screens/RegisterTatto"
import { useSelector } from "react-redux";
import { HomeAuth } from "./Screens/HomeAuth";
import { UserProfile } from "./Screens/UserProfile";
import { AdminAccount } from "./Screens/AdminAccount";
import { Error } from "./Screens/Error";
import { checkSession } from "./api/session";
import { useEffect} from "react";
import { useDispatch } from 'react-redux';
import { authenticateUser, setInfo ,unauthenticateUser} from './redux/slices/authSlice';
import { MapaUsers } from "./Screens/MapaUsers";
import { AboutMe } from "./Screens/AboutMe";
import { TattoStyles } from "./Screens/TattoStyles";





const PrivateRoutes =()=>{
  const {isAuth}= useSelector((state)=>state.auth);

  return <>{isAuth? <Outlet/>: <Navigate to="/login"/>}</>
}
const RestrictedRoutes =()=>{
  const {isAuth}= useSelector((state)=>state.auth);
  return <>{!isAuth?<Outlet/>: <Navigate to="/"/>}</>
  
}

function App() {

  const dispatch = useDispatch();
  const { isAuth, info } = useSelector((state) => state.auth);

  
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isAuth) {
        localStorage.setItem('authData', JSON.stringify({ isAuth, info }));


      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isAuth, info]);

  useEffect(() => {
    const handleLoad = () => {
      const authData = localStorage.getItem('authData');

      if (authData) {
        const { isAuth: storedIsAuth, info: storedInfo } = JSON.parse(authData);
        if (storedIsAuth) {
          dispatch(authenticateUser());  // Sin argumentos para que el slice use el estado almacenado
          dispatch(setInfo(storedInfo));
        } else {
          dispatch(unauthenticateUser());
        }

   
      }
    };

    handleLoad();

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [dispatch]);

  useEffect(() => {
    checkSession(dispatch);
  }, [dispatch]);

  return (
    <div >
      
      <Router>
   
        <NavBar></NavBar>
        <Routes>
          <Route element={<RestrictedRoutes></RestrictedRoutes>}>
            <Route exact path="/login" element={<Login />}></Route>

            
          </Route>
         
          <Route element={<PrivateRoutes></PrivateRoutes>}>
            <Route exact path="/HomeAuth" element={<HomeAuth></HomeAuth>}></Route> 
            <Route exact path="/AdminAccount" element={<AdminAccount />} />
            <Route exact path="/TattoStyles" element={<TattoStyles />} />

          </Route>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/BestTattos" element={<BestTattos />}></Route>
          <Route exact path="/Artist" element={<Artist />}></Route>
          <Route exact path="/Blog" element={<Blog />}></Route>
          <Route exact path="/Register" element={<Register/>}></Route>
          <Route exact path="/ChooseRegister" element={<ChooseRegister/>}></Route>
          <Route exact path="/RegisterTatto" element={<RegisterTatto/>}></Route>
          <Route exact path="/profile/:id/:name" element={<UserProfile />} info={info} />
          <Route exact path="/MapaUser" element={<MapaUsers/>}></Route>
          <Route exact path="/AboutMe" element={<AboutMe/>}></Route>
      
          <Route path="*" element={<Error/>}></Route>
        </Routes>
        <Footer></Footer>
   
      </Router>
      
    </div>
  );
}

export default App;