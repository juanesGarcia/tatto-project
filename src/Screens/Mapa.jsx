import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import React, { useEffect, useRef, useState } from 'react';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '../Styles/Map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoianVhbmVzLTEyMyIsImEiOiJjbHExM2E4ZzAwMXRxMmlueHA5ZnB4dXU4In0.KQFMVdrDUldzkKwXUIJP-w';
const googleMapsApiKey = 'AIzaSyA-BAdaQ7CAlBniXGzQTmAfMbbwqYiWkkQ';

export const Mapa = ({users}) => {
  const mapContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [city, setCity] = useState('');
  const [cityUser, setCityUser] = useState('');



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

        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
          marker: false,
          types: 'place',
        });

        geocoder.on('result', (event) => {
          const selectedCity = event.result.text;
          console.log(selectedCity, cityUser);
          setCity(selectedCity);
          if (selectedCity !== cityUser) {
            map.setCenter(event.result.center);
            updateMarkers(map, selectedCity,users);
          } else {
            map.setCenter(userLocation);
            updateMarkers(map, selectedCity,users);
          }
        });
        
        const userCityLocations = users.filter(
          (user) => user.city.toLowerCase() === cityUser.toLowerCase()
        );

        userCityLocations.forEach((user) => {
          const popupContent = `
  <div class="popup-content">
  <div class="popup-info">
  <img src="${user.avatar}" alt="Avatar" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 8px;">
    <h3 style="margin-bottom: 8px;">${user.name}</h3>
    </div>
    <p style="margin-bottom: 4px;">Ver perfil: 
      <a href="/profile/${encodeURIComponent(user.id)}/${encodeURIComponent(user.name)}"
         style="color: #007BFF; text-decoration: underline;">Ir al perfil</a>
    </p>
  </div>
`;


          const popup = new mapboxgl.Popup().setHTML(popupContent);
          new mapboxgl.Marker({ color: 'red' }).setLngLat([user.lon, user.lat]).setPopup(popup).addTo(map);
        });


        map.addControl(geocoder);
      });

      return () => map.remove();
    }
  }, [userLocation, cityUser,users]);

  const updateMarkers = (map, selectedCity, users) => {

    console.log(selectedCity)
    // Limpiar los marcadores existentes
    map
      .querySourceFeatures('users')
      .forEach((feature) => map.removeFeatureState({ source: 'users', id: feature.id }));
  
    // Filtrar y mostrar solo las ubicaciones de la ciudad seleccionada
     // Filtrar y mostrar solo las ubicaciones de la ciudad seleccionada
  const userCityLocations = users.filter(
    (user) => user.city.replace(/['"]/g, '').toLowerCase() === selectedCity.toLowerCase() && user.lon !== '' && user.lat !== ''
  );
  

    console.log(userCityLocations)
  
    userCityLocations.forEach((user) => {
      const popupContent = `
      <div class="popup-content">
      <div class="popup-info">
      <img src="${user.avatar}" alt="Avatar" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 8px;">
        <h3 style="margin-top: 7px;">${user.name}</h3>
        </div>
        <p style="margin-bottom: 4px;">Ver perfil: 
          <a href="/profile/${encodeURIComponent(user.id)}/${encodeURIComponent(user.name)}"
             style="color: #007BFF; text-decoration: underline;">Ir al perfil</a>
        </p>
      </div>
    `;
    
  
    const popup = new mapboxgl.Popup().setHTML(popupContent);
      const marker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat([user.lon, user.lat])
        .setPopup(popup)
        .addTo(map);
    });
  };

  const getCityFromCoordinates = async (userLocation) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation[1]},${userLocation[0]}&key=${googleMapsApiKey}`
      );
  
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        for (const component of data.results[0].address_components) {
          if (component.types.includes('locality')) {
            const cityUser = component.long_name;
            return cityUser;
          }
        }
      }
  
      console.error('No se pudo obtener la información de la ciudad.');
      return null;
    } catch (error) {
      console.error('Error al obtener la ciudad:', error);
      return null;
    }
  };

  return (
    <div className="containermap">
      <div className="mapt" ref={mapContainerRef} style={{ width: '100%' }}>
        {isLoading && <p>Cargando mapa...</p>}
      </div>
      <p>City: {cityUser}</p>
    </div>
  );
};
