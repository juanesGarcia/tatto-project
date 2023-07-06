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
import { useSelector } from "react-redux";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

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
  const { isAuth } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleAvatarClick = () => {
    setShowInfo(prevShowInfo => !prevShowInfo);
  };

  const style = {
    backgroundColor: "black",
  };
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
              >NO </Avatar>
              {showInfo && (
                <div className="profile-info">
                  <div className="profile-name">nicolas</div>
                  <div className="profile-name">nicolas@gmail.com</div>
                  <div className="profile-name">nicolas</div>
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
              <Avatar>N</Avatar>
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
