import React from 'react'
import "../Styles/Footer.css"
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export const Footer = () => {
    return (
        <div className="containerFooter">
            <div className="footer">
                <div className='contact'>
                    <h1>Contact us</h1>
                </div>
                <div className="footer-contact">
                    <p>Correo: correo@example.com</p>
                    <p>Teléfono: (123) 456-7890</p>
                </div>
                <div className='container-social'>
                    <a className="container-icons" href="https://web.facebook.com/juanesteban.cubillosgarcia.7/"> <FacebookRoundedIcon className='icons' sx={{ marginLeft: "5% !important" }}></FacebookRoundedIcon></a>
                    <a className="container-icons" href="https://www.instagram.com/juanestebancubillos/"> <InstagramIcon className='icons' sx={{ marginLeft: "5% !important" }}></InstagramIcon></a>
                    <a className="container-icons" href="https://www.instagram.com/juanestebancubillos/"><TwitterIcon  className='icons' sx={{ marginLeft: "5% !important" }}></TwitterIcon></a>
                    
                </div>
            </div>
        </div>
    )
}
