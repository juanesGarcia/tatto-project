import React, { useEffect, useRef, useState } from 'react';
import { loadGoogleMapsApi, createMap, createMarker } from './util';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import '../Styles/MapaUser.css';
import { updatelocation } from '../api/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const MapaUser = () => {
  const mapContainerRef = useRef(null);
  const [cityUser, setcityUser] = useState('');
  const [mapConfirm, setmapConfirm] = useState(false);
  const [userLocation, setuserLocation] = useState([])
  const {info} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [address, setAddress] = useState('');

  
  const handleSelect = async (selectedAddress) => { 
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      const { lat, lng } = latLng;

      // Actualiza la posición del usuario y el marcador en el mapa
      setuserLocation([lat, lng]);

      const googleMaps = await loadGoogleMapsApi('AIzaSyA-BAdaQ7CAlBniXGzQTmAfMbbwqYiWkkQ');
      const map = createMap(googleMaps, mapContainerRef.current, {
        center: { lat, lng },
        zoom: 14,
      });
      createMarker(googleMaps, map, { lat, lng });

      // Actualiza la dirección en el estado
      setAddress(selectedAddress);
    } catch (error) {
      console.error('Error al seleccionar la dirección:', error);
    }
  };
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        if (navigator.geolocation) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const { latitude, longitude } = position.coords;
          console.log(latitude,longitude)

          setuserLocation([latitude,longitude])
          

          // Cargar la API de Google Maps
          const googleMaps = await loadGoogleMapsApi('AIzaSyA-BAdaQ7CAlBniXGzQTmAfMbbwqYiWkkQ');

          // Crear el mapa
          const map = createMap(googleMaps, mapContainerRef.current, {
            center: { lat: latitude, lng: longitude },
            zoom: 14,
          });

          // Crear un marcador en el mapa
          createMarker(googleMaps, map, { lat: latitude, lng: longitude });
        } else {
          console.error('La geolocalización no está soportada por tu navegador.');
        }
      } catch (error) {
        console.error('Error al obtener la ubicación o cargar el mapa:', error);
      }
    };

    getUserLocation();
  }, [cityUser]);

  const updateLocationf = async (locationInfo) => {
    const id = info.id;
    const datalo = {
      id,
      lon: userLocation[1],
      lat: userLocation[0],
      cityUser: locationInfo, // Actualiza el objeto de datos con el pueblo o la ciudad
    };
    try {
      const response = await updatelocation(datalo);
      console.log(response.data.success);
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: `la cuidad actulizada es ${locationInfo}`,
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

  
  const getCityFromCoordinates = async () => {

    console.log(userLocation)

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation[0]}&lon=${userLocation[1]}`
      );
  
      const data = await response.json();
      const cityUser = data.address.city;
      const townUser = data.address.town; // Nueva línea para obtener el pueblo
      console.log(cityUser);
      console.log(townUser);
  
      // Utiliza el pueblo si está presente, de lo contrario, utiliza la ciudad
      const locationInfo = townUser || cityUser;
      console.log(locationInfo)
  
      setcityUser(locationInfo);

      updateLocationf(locationInfo);
      
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      setcityUser(''); // Establece un valor predeterminado o maneja el error según sea necesario
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
    <div className="containermmapa">
        <h2 className='confirmubi'>confirma tu ubicacion </h2>
      <div className="map" ref={mapContainerRef} style={{ width: '80%', height: '400px'}}></div>
      <h4>{cityUser}</h4>
      <div className='contbut'>
        <button className='button' onClick={getCityFromCoordinates}>confirmar</button>

        <button className='button' onClick={backToPerfil}>denegar</button>
      </div>
    </div>
  );
};
