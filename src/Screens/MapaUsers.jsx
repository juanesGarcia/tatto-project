import { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { updatelocation } from '../api/auth';
import { useSelector } from 'react-redux';
import "../Styles/MapaUser.css";

mapboxgl.accessToken = 'pk.eyJ1IjoianVhbmVzLTEyMyIsImEiOiJjbHExM2E4ZzAwMXRxMmlueHA5ZnB4dXU4In0.KQFMVdrDUldzkKwXUIJP-w';
const googleMapsApiKey = 'AIzaSyA-BAdaQ7CAlBniXGzQTmAfMbbwqYiWkkQ';

export const MapaUsers = () => {
  const mapContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newLocation, setNewLocation] = useState(null);
  const [cityUser, setCityUser] = useState('');
  const { info } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [map, setMap] = useState(null); // Estado para almacenar la instancia del mapa
  const [marker, setMarker] = useState(null); // Estado para almacenar el marcador
  const [suggestions, setSuggestions] = useState([]); // Estado para las sugerencias de ubicación
  const [noMatches, setNoMatches] = useState(false); // Estado para controlar el mensaje de "sin coincidencias"
  const [userTyped, setUserTyped] = useState(false); // Estado para saber si el usuario ha escrito algo significativo
  const [showSearch, setShowSearch] = useState(true); // Estado para controlar la visibilidad del buscador

  useEffect(() => {
    // Inicializar el mapa
    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 2,
    });

    mapInstance.on('load', () => {
      setIsLoading(false);
    });

    setMap(mapInstance); // Guardar la instancia del mapa en el estado

    return () => mapInstance.remove();
  }, []);

  const getCityFromCoordinates = async (coordinates) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates[1]},${coordinates[0]}&key=${googleMapsApiKey}`
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

  // Función de cambio de dirección con debounce
  let timeout;
  const handleAddressChange = async (e) => {
    const value = e.target.value;
    setAddress(value);
    setNoMatches(false); // Resetear el mensaje de "no se encontraron coincidencias" mientras el usuario escribe
    setUserTyped(value.length > 5); // Establecer que el usuario ha escrito algo significativo si tiene más de 2 caracteres

    // Limpiar el timeout anterior si lo hay
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(async () => {
      if (value) {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(value)}&key=${googleMapsApiKey}`
          );
          const data = await response.json();

          if (data.status === 'OK') {
            // Mostrar las primeras 5 sugerencias
            const locations = data.results.slice(0, 5);
            setSuggestions(locations);
            setNoMatches(false); // Si hay resultados, no mostrar mensaje de no coincidencias

            // Mover el mapa al nuevo lugar (sin agregar marcador)
            const firstLocation = locations[0].geometry.location;
            const coordinates = [firstLocation.lng, firstLocation.lat];
            setNewLocation(coordinates);

            // Mover el mapa al centro de la nueva ubicación
            map.flyTo({ center: coordinates, zoom: 15 });

          } else {
            setSuggestions([]);
            setNoMatches(true); // Si no hay resultados, mostrar el mensaje de no coincidencias
          }
        } catch (error) {
          console.error('Error al buscar la dirección o lugar:', error);
          setSuggestions([]);
          setNoMatches(true); // Si hay error en la búsqueda, mostrar el mensaje de no coincidencias
        }
      } else {
        // Si el campo de dirección está vacío, eliminamos el marcador y no movemos el mapa
        if (marker) {
          marker.remove();
        }
        setSuggestions([]);
        setNoMatches(false); // No mostrar mensaje si no hay búsqueda
      }
    }, 500); // Espera 500 ms después de que el usuario deje de escribir
  };

  const updateLocation = async () => {
    if (!newLocation) {
      Swal.fire({
        icon: "error",
        title: "Error al ingresar la clasificación",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
        },
      });
      return;
    }

    if (!cityUser) {
      setCityUser(await getCityFromCoordinates(newLocation));
    }

    const datalo = {
      id: info.id,
      lon: newLocation[0],
      lat: newLocation[1],
      cityUser,
    };

    try {
      if (cityUser && newLocation) {
        const response = await updatelocation(datalo);
        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Se ha actualiuzado la ubicacion correctamente",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: "custom-swal-popup",
              title: "custom-swal-title",
            },
          });
          setTimeout(() => {
            navigate(`/profile/${encodeURIComponent(info.id)}/${encodeURIComponent(info.name)}`);
          }, 2000);
        }
      } else {
        alert('Error al obtener los datos de ubicación o ciudad');
      }
    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Error al ingresar la ubicacion ",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "custom-swal-popup",
          title: "custom-swal-title",
        },
      });
    }
  };

  // Agregar marcador y actualizar el input solo cuando el usuario hace clic en una sugerencia
  const handleSuggestionClick = async (location) => {
    if (marker) {
      marker.remove();
    }

    const coordinates = [location.geometry.location.lng, location.geometry.location.lat];
    setNewLocation(coordinates);
    setCityUser(await getCityFromCoordinates(coordinates));

    const newMarker = new mapboxgl.Marker({ color: 'red' })
      .setLngLat(coordinates)
      .addTo(map);

    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<h4>Ubicación de mi negocio</h4><p>${location.formatted_address}</p>`);

    newMarker.setPopup(popup);
    setMarker(newMarker);
    map.flyTo({ center: coordinates, zoom: 15 });

    setAddress(location.formatted_address);
    setShowSearch(false); // Ocultar el buscador y las sugerencias después de seleccionar una sugerencia
  };

  const handleVolver = async () =>{
    navigate(`/profile/${encodeURIComponent(info.id)}/${encodeURIComponent(info.name)}`);
  }

  return (
    <div className="containerUserMap">

        <h2 className='titulo'> Agrega la ubicación de tu local</h2>

      

      <div className='containerMap'>
           <div className="map mb-4 mt-4" ref={mapContainerRef} >
        {isLoading && <p>Cargando mapa...</p>}
      </div>
      </div>

   
      <div className='containerBuscar'>

        <div className='elementosBuscar'>
                {/* Solo mostrar el campo de búsqueda si showSearch es true */}
      {showSearch && (
        <div className="form-group mb-4">
          <div className='buscarUbicacion'>
            <h3>Buscar ubicacion <h6 className='digitar'>Digitar (direccion y cuidad) o (Lugar y cuidad)</h6></h3>
          </div>
          
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={handleAddressChange}
            placeholder="Ingresa una dirección completa (direccion y cuidad) o por nombre de un lugar (lugar y cuidad ) "
          />
        </div>
      )}

      {/* Mostrar sugerencias */}
      <div className="mt-3 mb-4">
        {suggestions.length > 0 && showSearch && (

          <div>  
            <ul>
            <h5 className='seleccionUbicacion'>Seleccione una sugerencia de ubicacion </h5>
          </ul>
            <ul className="list-group">
            {suggestions.map((location, index) => {
              return (
                <li key={index} className="list-group-item" onClick={() => handleSuggestionClick(location)}>
                  <strong>{address}</strong>
                  <br />
                  {location.formatted_address}
                </li>
              );
            })}
          </ul>
        
          </div>
          
        )}

        {userTyped && suggestions.length === 0 && address && showSearch && (
          <p className="text-danger mt-2">No se encontraron coincidencias exactas. Intente con una dirección o nombre diferente.</p>
        )}
      </div>




        </div>
        


      </div>

<div className='botones'>
      <div className="confirmButton  ">
        <button className="button" onClick={updateLocation}>
          Confirmar ubicación
        </button>
      </div>
      <div className="volver">
        <button className="button" onClick={handleVolver}>
          Ir al perfil
        </button>
      </div>

</div>

    </div>
  );
};
