import NavBar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import{ Home } from "./Screens/Home"
import{ Login } from "./Screens/Login"
import{ BestTattos } from "./Screens/BestTattos"
import{ Artist } from "./Screens/Artist"
import{ Blog } from "./Screens/Blog"


function App() {
 
  return (
    <div >
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/BestTattos" element={<BestTattos />}></Route>
          <Route exact path="/Artist" element={<Artist />}></Route>
          <Route exact path="/Blog" element={<Blog />}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;