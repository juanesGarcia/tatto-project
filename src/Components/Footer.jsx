import React from 'react';
import '../Styles/Footer.css';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import MiImagen from './icons8-threads-48.png';

export const Footer = () => {
  return (
    <div className="containerFooter">
      <div className="footer">
        <div className="contact">
          <h1>Contacta con nosotros</h1>
        </div>
        <div className="footer-contact">
          <p>Correo: juanesgym2018@gmail.com</p>
          <p>Teléfono: +57 3186699925 </p>
        </div>
        <div className="container-social">
          <a
            className="container-icons"
            href="https://web.facebook.com/profile.php?id=61554505598366"
            target="_blank" // Abre el enlace en una nueva pestaña o ventana
            title="Facebook"
          >
            <FacebookRoundedIcon className="icons" sx={{ marginLeft: '5% !important' }} />
          </a>
          <a
            className="container-icons"
            href="https://www.instagram.com/tattoproart/"
            target="_blank" // Abre el enlace en una nueva pestaña o ventana
            title="Instagram"
          >
            <InstagramIcon className="icons" sx={{ marginLeft: '5% !important' }} />
          </a>
          
        </div>
      </div>
    </div>
  );
};