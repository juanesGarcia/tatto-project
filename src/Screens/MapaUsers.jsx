import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '../Styles/MapaUser.css';
import { updatelocation } from '../api/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

mapboxgl.accessToken = 'pk.eyJ1IjoianVhbmVzLTEyMyIsImEiOiJjbHExM2E4ZzAwMXRxMmlueHA5ZnB4dXU4In0.KQFMVdrDUldzkKwXUIJP-w';

export const MapaUsers = () => {
  const mapContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [cityUser, setcityUser] = useState('');
  const {info} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([longitude, latitude]);
          },
          (error) => {
            console.error('Error al obtener la ubicación:', error);
          }
        );
      } else {
        console.error('La geolocalización no está soportada por tu navegador.');
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      getCityFromCoordinates(userLocation).then((cityUser) => {
        setcityUser(cityUser);
        console.log(cityUser);

        if (cityUser) {
          console.log(`La ciudad correspondiente a las coordenadas es: ${cityUser}`);
        } else {
          console.log('No se pudo obtener la información de la ciudad.');
        }
      });
    }
  }, [userLocation]);

  useEffect(() => {
    if (userLocation && cityUser) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: userLocation,
        zoom: 14,
      });

      map.on('load', () => {
        setIsLoading(false);
        const userPopup = new mapboxgl.Popup().setHTML('<h3>Tu ubicación</h3>');
        new mapboxgl.Marker().setLngLat(userLocation).setPopup(userPopup).addTo(map);

      });

      return () => map.remove();
    }
  }, [userLocation, cityUser]);

  
  const getCityFromCoordinates = async (userLocation) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation[1]}&lon=${userLocation[0]}`
      );

      const data = await response.json();
      const cityUser = data.address.city;

      return cityUser;
    } catch (error) {
      console.error('Error al obtener la ciudad:', error);
      return null;
    }
  };

  const updateLocation = async () => {
    const id = info.id;
    const datalo = {
      id,
      lon: userLocation[0],
      lat: userLocation[1],
      cityUser: cityUser, // Actualiza el objeto de datos con el pueblo o la ciudad
    };
    try {
      const response = await updatelocation(datalo);
      console.log(response.data.success);
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: `la cuidad actulizada es ${cityUser}`,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
          },
        });
  
        // Esperar un segundo antes de navegar a la otra página
        setTimeout(() => {
          navigate(`/profile/${encodeURIComponent(info.id)}/${encodeURIComponent(info.name)}`);
        }, 2000);
      }
    } catch (error) {
      return error;
    }
  };

  const backToPerfil = () =>{

    Swal.fire({
        icon: 'error',
        title: `no se ha actulizado tu ubicacion `,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
        },
      });
  

       // Esperar un segundo antes de navegar a la otra página
       setTimeout(() => {
        navigate(`/profile/${encodeURIComponent(info.id)}/${encodeURIComponent(info.name)}`);
      }, 2000);


  }
  




  return (
    <div className="contmap">
        <h2 className='confirmubi'>confirma tu ubicacion </h2>
      <div className="map" ref={mapContainerRef} style={{ width: '100%'}}>
        {isLoading && <p>Cargando mapa...</p>}
      </div>
       <div className='contbut'>
        <button className='button' onClick={updateLocation}>confirmar</button>

        <button className='button' onClick={backToPerfil}>denegar</button>
      </div>
      <h4>la cuidad es : {cityUser}</h4>
    </div>
  );
};

