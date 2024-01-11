import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import React, { useEffect, useRef, useState } from 'react';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '../Styles/Map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoianVhbmVzLTEyMyIsImEiOiJjbHExM2E4ZzAwMXRxMmlueHA5ZnB4dXU4In0.KQFMVdrDUldzkKwXUIJP-w';

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
            updateMarkers(map, selectedCity);
          } else {
            map.setCenter(userLocation);
            updateMarkers(map, selectedCity);
          }
        });
        
        const userCityLocations = users.filter(
          (user) => user.city.toLowerCase() === cityUser.toLowerCase()
        );

        userCityLocations.forEach((user) => {
          const popup = new mapboxgl.Popup().setHTML(`<h3>${user.name}</h3>`);
          new mapboxgl.Marker({ color: 'red' }).setLngLat([user.lon, user.lat]).setPopup(popup).addTo(map);
        });


        map.addControl(geocoder);
      });

      return () => map.remove();
    }
  }, [userLocation, cityUser,users]);

  const updateMarkers = (map, selectedCity, users) => {
    // Limpiar los marcadores existentes
    map
      .querySourceFeatures('users')
      .forEach((feature) => map.removeFeatureState({ source: 'users', id: feature.id }));
  
    // Filtrar y mostrar solo las ubicaciones de la ciudad seleccionada
    const userCityLocations = users.filter(
      (user) => user.city.toLowerCase() === selectedCity.toLowerCase()
    );
  
    userCityLocations.forEach((user) => {
      const popup = new mapboxgl.Popup().setHTML(`<h3>${user.name}</h3>`);
      const marker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat([user.lon, user.lat])
        .setPopup(popup)
        .addTo(map);
  
      // Guardar el estado del marcador para futuras referencias
      map.setFeatureState(
        { source: 'users', id: marker._elementId },
        { city: user.city, coordinates: [user.lon, user.lat] }
      );
    });
  };
  
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

  return (
    <div className="containermap">
      <div className="mapt" ref={mapContainerRef} style={{ width: '100%' }}>
        {isLoading && <p>Cargando mapa...</p>}
      </div>
      <p>City: {cityUser}</p>
    </div>
  );
};
