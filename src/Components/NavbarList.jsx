import { Box } from '@mui/material'
import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import "../Styles/NavbarList.css";
import { styled } from "@mui/material/styles";
import logo from "/images/logofinal.jpg";
import { useDispatch, useSelector } from "react-redux";
import PersonIcon from '@mui/icons-material/Person';

const CustomList = styled(ListItemButton)(({ theme }) => ({
  "&:hover": {
    color: "#917E41 !important",
  },
}));
const handleClick = (setOpen, perfilClick) => {
  setOpen(false); // Cierra el componente
  if (perfilClick) perfilClick(); // Ejecuta perfilClick si está definido
};
export const NavbarList = ({ navlinks, setOpen,perfilClick }) => {
  const { isAuth, info, postsLength } = useSelector((state) => state.auth);
  return (
    <>
      <Box sx={{ width: "100%", backgroundColor: '#171717', height: "100%" }} >
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem>
              <img src={logo} alt="" className='img' />
            </ListItem>
            <ListItem >
              <CustomList component={NavLink} to="/" onClick={() => setOpen(false)} className="words">
                <ListItemText sx={{
                  marginTop: "8%",
                  borderBottom: '1px solid #917E41',
                  marginLeft: "4%"
                }}><HomeIcon sx={{
                  color: "white"
                }}></HomeIcon ><a className='words'>Casa</a></ListItemText>
              </CustomList>
            </ListItem>
            {
   isAuth &&(
    <ListItem >
    <CustomList onClick={() => handleClick(setOpen, perfilClick)} className="perfil">
      <ListItemText sx={{
        borderBottom: '1px solid #917E41',
        marginLeft: "4%"
      }}><PersonIcon sx={{
        color: "white"
      }}></PersonIcon ><a className='words'>Perfil</a></ListItemText>
    </CustomList>
  </ListItem>
  )
}{
  navlinks.map(item => (
    <ListItem disablePadding key={item.title} >
      <CustomList component={NavLink} to={item.path} onClick={() => setOpen(false)} className="words">
        <ListItemText sx={{
          marginLeft: '7%', borderBottom: '1px solid #917E41',
          paddingBottom: '2%'
        }}>
          {item.icon}<a className='words'>{item.title}</a>
        </ListItemText>
      </CustomList>
    </ListItem>
  ))
}


          </List>
        </nav>
      </Box>

    </>

  )
}
