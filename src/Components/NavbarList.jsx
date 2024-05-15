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

const CustomList = styled(ListItemButton)(({ theme }) => ({
  "&:hover": {
    color: "#917E41 !important",
  },
}));

export const NavbarList = ({ navlinks, setOpen }) => {
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
              navlinks.map(item => (
                <ListItem disablePadding key={item.title} >
                  <CustomList component={NavLink} to={item.path} onClick={() => setOpen(false)} className="words">
                    <ListItemText sx={{
                      marginLeft: '7%', borderBottom: '1px solid #917E41',
                      paddingBottom: '2%'
                    }}>   {item.icon}<a className='words'>{item.title}</a></ListItemText>
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
