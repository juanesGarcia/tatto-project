import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import React, { useEffect, useRef, useState } from 'react';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '../Styles/Map.css'

mapboxgl.accessToken = 'pk.eyJ1IjoianVhbmVzLTEyMyIsImEiOiJjbHExM2E4ZzAwMXRxMmlueHA5ZnB4dXU4In0.KQFMVdrDUldzkKwXUIJP-w';

export const Mapa = () => {
  const mapContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [city, setCity] = useState('')
  const [cityUser, setcityUser] = useState('')
  

  const locations = [
    { name: 'Bogotá', coordinates: [-74.081749, 4.609710] },
    { name: 'Medellín', coordinates: [-75.563591, 6.253041] },
    { name: 'Cali', coordinates: [-76.522011, 3.42158] },
    { name: 'Cartagena', coordinates: [-75.539787, 10.426423] },
    { name: 'Barranquilla', coordinates: [-74.807047, 10.963889] },
    { name: 'Santa Marta', coordinates: [-74.208889, 11.240791] },
    { name: 'Cúcuta', coordinates: [-72.509351, 7.893907] },
    { name: 'Villavicencio', coordinates: [-73.637687, 4.134049] },
    { name: 'Pereira', coordinates: [-75.696144, 4.808717] },
    { name: 'Manizales', coordinates: [-75.563591, 5.068784] },
    { name: 'Pasto', coordinates: [-77.281107, 1.21361] },
    { name: 'Ibagué', coordinates: [-75.232726, 4.441931] },
    { name: 'Neiva', coordinates: [-75.311935, 2.927299] },
    { name: 'Armenia', coordinates: [-75.680037, 4.53389] },
    { name: 'Popayán', coordinates: [-76.615556, 2.454167] },
    { name: 'Bucaramanga', coordinates: [-73.118294, 7.119349] },
    { name: 'Valledupar', coordinates: [-73.2472, 10.4642] },
    { name: 'Montería', coordinates: [-75.882802, 8.74798] },
    { name: 'Sincelejo', coordinates: [-75.39765, 9.29677] },
    { name: 'Tunja', coordinates: [-73.356039, 5.535554] },
    { name: 'Riohacha', coordinates: [-72.906128, 11.544443] },
    { name: 'Quibdó', coordinates: [-76.63558, 5.69472] },
    { name: 'Arauca', coordinates: [-70.759768, 7.08471] },
    { name: 'Yopal', coordinates: [-72.395858, 5.337752] },
    { name: 'Mocoa', coordinates: [-76.652809, 1.149678] },
    { name: 'Puerto Carreño', coordinates: [-67.4854, 6.18941] },
    { name: 'San José del Guaviare', coordinates: [-72.6417, 2.5729] },
    { name: 'Mitú', coordinates: [-70.234459, 1.198611] },
    { name: 'Inírida', coordinates: [-67.92389, 3.865] },
    { name: 'Leticia', coordinates: [-69.943161, -4.198452] },
    { name: 'Puerto Nariño', coordinates: [-70.38333, -3.81111] },
    { name: 'Guaviare', coordinates: [-73.635559, 2.571111] },
    { name: 'Guaviare', coordinates: [-73.635559, 2.571111] },
    { name: 'Guaviare', coordinates: [-73.635559, 2.571111] },
    { name: 'Guaviare', coordinates: [-73.635559, 2.571111] },
    { name: 'Guaviare', coordinates: [-73.635559, 2.571111] },
    { name: 'Guaviare', coordinates: [-73.635559, 2.571111] },
    { name: 'Guaviare', coordinates: [-73.635559, 2.571111] },
    { name: 'Guaviare', coordinates: [-73.635559, 2.571111] },
    { name: 'Guaviare', coordinates: [-73.635559, 2.571111] },
    { name: 'Guaviare', coordinates: [-73.635559, 2.571111] },
    { name: 'Bogotá', coordinates: [-74.13492063393107, 4.580732611557705] },
    { name: 'Bogotá', coordinates: [-74.13792063393107, 4.580732611557705] },
    { name: 'Bogotá', coordinates: [-74.14092063393107, 4.580732611557705] },
    { name: 'Bogotá', coordinates: [-74.13392063393107, 4.583732611557705] },
    { name: 'Bogotá', coordinates: [-74.13692063393107, 4.583732611557705] },
    { name: 'Bogotá', coordinates: [-74.13992063393107, 4.583732611557705] },
    {name: 'Ubicación 8', coordinates: [-74.13292063393107, 4.586732611557705] },
    { name: 'Ubicación 9', coordinates: [-74.13592063393107, 4.586732611557705] },
    { name: 'Ubicación 10', coordinates: [-74.13892063393107, 4.586732611557705] },
    { name: 'Medellín', coordinates: [-75.563591, 6.253041] },
    { name: 'Medellín', coordinates: [-75.566591, 6.250041] },
    { name: 'Medellín', coordinates: [-75.569591, 6.255041] },
    { name: 'Medellín', coordinates: [-75.562591, 6.250041] },
    { name: 'Medellín', coordinates: [-75.565591, 6.253041] },
    { name: 'Medellín', coordinates: [-75.568591, 6.248041] },
    { name: 'Medellín', coordinates: [-75.561591, 6.255041] },
    { name: 'Medellín', coordinates: [-75.564591, 6.258041] },
    { name: 'Medellín', coordinates: [-75.567591, 6.253041] },
    { name: 'Medellín', coordinates: [-75.570591, 6.250041] }
  ];
  
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
        if (cityUser) {
          console.log(`La ciudad correspondiente a las coordenadas es: ${cityUser}`);
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
              console.log(selectedCity,cityUser)
              setCity(selectedCity);
              if(selectedCity!==cityUser){
                  map.setCenter(event.result.center);
                updateMarkers(map,selectedCity);
              }
            });
    
            // Filtrar y mostrar solo las ubicaciones de la ciudad del usuario
            const userCityLocations = locations.filter(
              (location) => location.name.toLowerCase() === cityUser.toLowerCase()
            );
    
            userCityLocations.forEach((location) => {
              const popup = new mapboxgl.Popup().setHTML(`<h3>${location.name}</h3>`);
              new mapboxgl.Marker({ color: 'red' }).setLngLat(location.coordinates).setPopup(popup).addTo(map);
            });
  
            map.addControl(geocoder);
          });
  
          return () => map.remove();
        }
      });
    }
  }, [userLocation,cityUser]);

  const updateMarkers = (map, selectedCity) => {
    // Limpiar los marcadores existentes
    map
      .querySourceFeatures('locations')
      .forEach((feature) => map.removeFeatureState({ source: 'locations', id: feature.id }));
  
    // Filtrar y mostrar solo las ubicaciones de la ciudad seleccionada
    const userCityLocations = locations.filter(
      (location) => location.name.toLowerCase() === selectedCity.toLowerCase()
    );
  
    userCityLocations.forEach((location) => {
      const popup = new mapboxgl.Popup().setHTML(`<h3>${location.name}</h3>`);
      const marker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(location.coordinates)
        .setPopup(popup)
        .addTo(map);
  
      // Guardar el estado del marcador para futuras referencias
      map.setFeatureState(
        { source: 'locations', id: marker._elementId },
        { city: location.name, coordinates: location.coordinates }
      );
    });
  };
  

  const getCityFromCoordinates = async (userLocation) => {
    console.log(userLocation)
    console.log(userLocation[0],userLocation[1])
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
  
  
  getCityFromCoordinates(userLocation).then((cityUser) => {
    setcityUser(cityUser)
    console.log(cityUser)
    if (cityUser) {
      console.log(`La ciudad correspondiente a las coordenadas es: ${cityUser}`);
    } else {
      console.log('No se pudo obtener la información de la ciudad.');
    }
  });

  return (
    <div className="containermap">
      <div className="mapt" ref={mapContainerRef} style={{ width: '100%'}}>
        {isLoading && <p>Cargando mapa...</p>}
      </div>
      <p>City: {city}</p>
    </div>
  );
};

