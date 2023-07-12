import logo from "/images/logofinal.jpg";
import "../Styles/Navbar.css";
import React from 'react';
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
import { getUser, onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";
import { useNavigate } from 'react-router-dom';

const navlinks = [

  {
    title: "Blog",
    path: "/Blog",
    icon: <ArticleIcon sx={{
      color: "white"
    }}></ArticleIcon>
  },
  {
    title: "Best tattos",
    path: "/BestTattos",
    icon: <ArticleIcon sx={{
      color: "white"
    }}></ArticleIcon>
  },
  {
    title: "Tatto Artist",
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

  const perfilClick = () => {
    navigate(`/profile/${encodeURIComponent(info.name)}`);
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

    } catch (error) {
      console.log(error.reponse)
    }
  }

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <Avatar src={logo}></Avatar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}>
            <CustomButton component={NavLink} to="/"> <HomeIcon className="icon" ></HomeIcon></CustomButton>
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
              >{info.name[0]} </Avatar>
              {showInfo && (
                <div className="profile-info" onClick={handleInfoClose}>
                  <div className="left-div"><Avatar sx={{ width: 60, height: 60 }}>{info.name[0]}</Avatar></div>
                  <div className="right-div">
                  <div className="profile-name">{info.name}</div>
                  <div className="profile-email">{info.email}</div>
                  <div className="administrar" onClick={perfilClick}> administrar cuenta </div>
                  <div className="bottom-component"  onClick={() => logout()}>logout</div>
                  </div>
              

                </div>
  
              )}
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: "2%" }} >
              <CustomButton sx={{ marginRight: "10%", borderBottom: "1px solid #917E41" }} component={NavLink} to="/login" className="login">
                login
              </CustomButton>
              <CustomButton sx={{ borderBottom: "1px solid #917E41", marginRight: "10%" }} component={NavLink} to="/ChooseRegister" className="signup">
                Sign up
              </CustomButton>
              <Avatar onClick={handleAvatarClick}></Avatar>
              {showInfo && (
                <div className="profile-info" onClick={handleInfoClose}>
                  <div className="left-div"><Avatar sx={{ width: 60, height: 60 }}></Avatar></div>
                  <div className="right-div">
                  <div className="profile-nameNo">Create an account</div>
                  <div className="profile-No"><NavLink className="profile-login" to='/login'>Login</NavLink>  </div>
                  </div>
              

                </div>
  
              )}
            </Box>
          )

          }


        </Toolbar>
      </StyledAppBar>

      <Drawer open={open} anchor="left" onClose={() => setOpen(false)} sx={{ display: { xs: "flex", md: "none" } }}>
        <NavbarList navlinks={navlinks} setOpen={setOpen} />
      </Drawer>
    </>
  );
}

export default Navbar;
