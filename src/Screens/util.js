// En un archivo llamado util.js

export const loadGoogleMapsApi = (apiKey) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.google.maps);
      script.onerror = () => reject(new Error('Error al cargar la API de Google Maps.'));
      document.head.appendChild(script);
    });
  };
  
  export const createMap = (googleMaps, container, options) => {
    return new googleMaps.Map(container, options);
  };
  
  export const createMarker = (googleMaps, map, position) => {
    return new googleMaps.Marker({
      position: position,
      map: map,
    });
  };
  