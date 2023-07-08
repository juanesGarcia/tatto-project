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
import { AdminCount } from "./Screens/AdminCount";

const PrivateRoutes =()=>{
  const {isAuth}= useSelector((state)=>state.auth);

  return <>{isAuth? <Outlet/>: <Navigate to="/login"/>}</>
}
const RestrictedRoutes =()=>{
  const {isAuth}= useSelector((state)=>state.auth);
  return <>{!isAuth?<Outlet/>: <Navigate to="/"/>}</>
}

function App() {
 
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
            
            
          </Route>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/BestTattos" element={<BestTattos />}></Route>
          <Route exact path="/Artist" element={<Artist />}></Route>
          <Route exact path="/Blog" element={<Blog />}></Route>
          <Route exact path="/Register" element={<Register/>}></Route>
          <Route exact path="/ChooseRegister" element={<ChooseRegister/>}></Route>
          <Route exact path="/RegisterTatto" element={<RegisterTatto/>}></Route>
          <Route exact path="/profile/:id/:name" element={<UserProfile />} />
          <Route exact path="/Admin" element={<AdminCount />} />
        </Routes>
        <Footer></Footer>
      </Router>
      
    </div>
  );
}

export default App;