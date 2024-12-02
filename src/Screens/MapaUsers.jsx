import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '../Styles/MapaUser.css';
import { updatelocation } from '../api/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import mapboxglGeocoder from '@mapbox/mapbox-gl-geocoder';

mapboxgl.accessToken = 'pk.eyJ1IjoianVhbmVzLTEyMyIsImEiOiJjbHExM2E4ZzAwMXRxMmlueHA5ZnB4dXU4In0.KQFMVdrDUldzkKwXUIJP-w';
const googleMapsApiKey = 'AIzaSyA-BAdaQ7CAlBniXGzQTmAfMbbwqYiWkkQ';

export const MapaUsers = () => {
  const mapContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [cityUser, setCityUser] = useState('');
  const [newLocation, setNewLocation] = useState(null); // Solo inicializa como null
  const { info } = useSelector((state) => state.auth);
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
        setCityUser(cityUser);
        console.log(cityUser);
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

      const geocoder = new mapboxglGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      });

      map.addControl(geocoder);

      geocoder.on('result', (event) => {
        // Extraer las coordenadas del evento
        
          setNewLocation(event.result.geometry.coordinates);

          // Coloca el marcador en la ubicación seleccionada
          new mapboxgl.Marker()
            .setLngLat(newLocation)
            .setPopup(new mapboxgl.Popup().setHTML('<h3>Ubicación seleccionada</h3>'))
            .addTo(map);
       
         
        
      });

      // Mostrar la ubicación del usuario
      map.on('load', () => {
        setIsLoading(false);
        const userPopup = new mapboxgl.Popup().setHTML('<h3>Tu ubicación</h3>');
        new mapboxgl.Marker().setLngLat(userLocation).setPopup(userPopup).addTo(map);
      });

      return () => map.remove();
    }
  }, [userLocation, cityUser]);

  // Función para obtener la ciudad basada en las coordenadas
  const getCityFromCoordinates = async (userLocation) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation[1]},${userLocation[0]}&key=${googleMapsApiKey}`
      );
  
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        for (const component of data.results[0].address_components) {
          if (component.types.includes('locality')) {
            return component.long_name;
          }
        }
      }
      return null;
    } catch (error) {
      console.error('Error al obtener la ciudad:', error);
      return null;
    }
  };

  // Función para actualizar la ubicación en la base de datos
  const updateLocation = async () => {

    const locationToUse = newLocation != null ? newLocation : userLocation;

    if (!locationToUse || locationToUse.length === 0) {
      console.error('No se ha seleccionado una ubicación válida');
      return;
    }

    const datalo = {
      id: info.id,
      lon: locationToUse[0],
      lat: locationToUse[1],
      cityUser: cityUser,
    };

    try {
      const response = await updatelocation(datalo);
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: `La ciudad actualizada es ${cityUser}`,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate(`/profile/${encodeURIComponent(info.id)}/${encodeURIComponent(info.name)}`);
        }, 2000);
      }
    } catch (error) {
      console.error('Error al actualizar la ubicación:', error);
    }
  };

  const backToPerfil = () => {
    Swal.fire({
      icon: 'error',
      title: `No se ha actualizado tu ubicación`,
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      navigate(`/profile/${encodeURIComponent(info.id)}/${encodeURIComponent(info.name)}`);
    }, 2000);
  };

  return (
    <div className="contmap">
      <h2 className='confirmubi'>Agrega la ubicación de tu local</h2>
      <div className="map" ref={mapContainerRef} style={{ width: '100%' }}>
        {isLoading && <p>Cargando mapa...</p>}
      </div>
      <h4 className='city'>La ciudad es: {cityUser}</h4>
      <div className='contbut'>
        <button className='button' onClick={updateLocation}>Confirmar</button>
        <button className='button' onClick={backToPerfil}>Denegar</button>
      </div>
    </div>
  );
};
