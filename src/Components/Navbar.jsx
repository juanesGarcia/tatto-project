
import logo from "/images/logofinal.jpg"
import "../Styles/Navbar.css";
import { NavLink } from "react-router-dom";
import * as React from "react";
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

const navlinks = [

  {
    title: "Blog",
    path: "/Blog",
    icon:<ArticleIcon sx={{
      color: "white"
    }}></ArticleIcon>
  },
  {
    title: "Best tattos",
    path: "/BestTattos",
    icon:<ArticleIcon sx={{
      color: "white"
    }}></ArticleIcon>
  },
  {
    title: "Tatto Artist",
    path: "/Artist",
    icon:<ArticleIcon sx={{
      color: "white"
    }}></ArticleIcon>
  },
];
const StyledAppBar = styled(AppBar)({
  backgroundColor: "#171717", // Color personalizado
});
const CustomButton = styled(Button)(({ theme }) => ({
  color:"#917E41",
  "&:hover": {
    color: "#917E41 !important",
  },
}));

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <Avatar  src={logo}></Avatar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{display:{xs:"flex", md:"none"}}}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{display:{xs:"none", md:"block"},  flexGrow: 1}}>
          <CustomButton component={NavLink} to="/"> <HomeIcon className="icon" ></HomeIcon></CustomButton>
            {navlinks.map((items) => (
              <CustomButton key={items.title} className="words" component={NavLink} to={items.path}>
                  {items.title}
              </CustomButton>
            ))}
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center',marginLeft: 'auto', marginRight:"2%"}} >
          <CustomButton sx={{marginRight:"20%" , borderBottom:"1px solid #917E41"}} component={NavLink} to="/login" className="login">
            login 
          </CustomButton>
                <Avatar alt="R" />
          </Box>
          
        </Toolbar>
      </StyledAppBar>

      <Drawer open={open} anchor="left" onClose={() => setOpen(false)}  sx={{display:{xs:"flex", md:"none"}}}>
        <NavbarList navlinks={navlinks} setOpen={setOpen}/>
      </Drawer>
    </>
  );
}

export default Navbar;
