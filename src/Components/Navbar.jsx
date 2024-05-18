import logo from "/images/logofinal.jpg";
import "../Styles/Navbar.css";
import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { NavbarList } from "./NavbarList";
import { styled } from "@mui/material/styles";
import ArticleIcon from '@mui/icons-material/Article';
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

const navlinks = [
 
  {
    title: "Acerca De Nosotros",
    path: "/AboutMe",
    icon: <ArticleIcon sx={{
      color: "white"
    }}></ArticleIcon>
  },

  {
    title: "Preguntas",
    path: "/Blog",
    icon: <ArticleIcon sx={{
      color: "white"
    }}></ArticleIcon>
  },
  {
    title: "Tatuajes",
    path: "/BestTattos",
    icon: <ArticleIcon sx={{
      color: "white"
    }}></ArticleIcon>
  },
  {
    title: "Artistas",
    path: "/Artist",
    icon: <ArticleIcon sx={{
      color: "white"
    }}></ArticleIcon>
  },
];
const StyledAppBar = styled(AppBar)({
  backgroundColor: "#171717", // Color personalizado
});
const CustomButton = styled(Button)(({ theme }) => ({
  color: "#917E41",
  "&:hover": {
    color: "#917E41 !important",
  },
}));

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const { info } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [tempUserInfo, setTempUserInfo] = useState(null);  // Nuevo estado para almacenar temporalmente la información del usuario

  const perfilClick = () => {
    const { id, name } = tempUserInfo || info;  // Utiliza la información temporal si está disponible, de lo contrario, usa la información actual
    navigate(`/profile/${encodeURIComponent(id)}/${encodeURIComponent(name)}`);
  };
  const handleAvatarClick = () => {
    setShowInfo(prevShowInfo => !prevShowInfo);
  };
  const handleInfoClose = () => {
    setShowInfo(false);
  };

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser())
      localStorage.removeItem('token');
      localStorage.removeItem('authData');
      navigate('/');


    } catch (error) {
      console.log(error.reponse)
    }
  }

  

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar className="toolbar-container">
          <Avatar src={logo}></Avatar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box className="nav-links"   sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}>
            <CustomButton component={NavLink} to="/"> <HomeIcon className="icon" ></HomeIcon></CustomButton>
            {
              isAuth &&(
                <CustomButton onClick={perfilClick}> <PersonIcon className="icon" ></PersonIcon><div className="perfil">Perfil</div></CustomButton>
              )
            }
            
            {navlinks.map((items) => (
              <CustomButton key={items.title} className="words" component={NavLink} to={items.path}>
                {items.title}
              </CustomButton>
            ))}
          </Box>
          {isAuth ? (
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: "2%" }}>
              <Avatar
                alt="User Avatar"
                onClick={handleAvatarClick}
                src={info.media_url}
                style={{ cursor: "pointer" }}
              > {info.name[0]}</Avatar>
              {showInfo && (
                
                <div className="profile-info" onClick={handleInfoClose}>
                  <div className="left-div"><Avatar sx={{ width: 60, height: 60 }} src={info.media_url}>{info.name[0]}</Avatar></div>
                  <div className="right-div">
                  <div className="profile-name" onClick={perfilClick}>{info.name}</div>
                  <div className="profile-email">{info.email}</div>
                  <NavLink to="/AdminAccount" className='editarNav'>editar perfil</NavLink>
                  <div className="bottom-component"  onClick={() => logout()}>Salir</div>
                  </div>
                </div>
  
              )}
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: "2%" }} >
              <CustomButton sx={{ marginRight: "10%", borderBottom: "1px solid #917E41" }} component={NavLink} to="/login" className="login">
                Iniciar sesión
              </CustomButton>
              <CustomButton sx={{ borderBottom: "1px solid #917E41", marginRight: "10%" }} component={NavLink} to="/ChooseRegister" className="signup">
                Registrate
              </CustomButton>
              
              
              <Avatar onClick={handleAvatarClick} style={{ cursor: "pointer" }}></Avatar>
              {showInfo && (
                <div className="profile-info" onClick={handleInfoClose}>
                  <div className="left-div"><Avatar sx={{ width: 60, height: 60 }}></Avatar></div>
                  <div className="right-div">
                  <div className="profile-nameNo">Crea una cuenta</div>
                  <div className="profile-No"><NavLink className="profile-login" to='/login'>Iniciar Sessión</NavLink>  </div>
                  </div>
              

                </div>
  
              )}
            </Box>
          )

          }


        </Toolbar>
      </StyledAppBar>

      <Drawer open={open} anchor="left" onClose={() => setOpen(false)} sx={{ display: { xs: "flex", md: "none" } }}>
        <NavbarList navlinks={navlinks} setOpen={setOpen} perfilClick={perfilClick}/>
      </Drawer>
    </>
  );
}

export default Navbar;
