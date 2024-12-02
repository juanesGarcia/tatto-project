import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/SearchP.css";
import { getUsers,getUsersWithRating} from '../api/auth';
import { Avatar } from '@mui/material';
import { Mapa } from "./Mapa";
import StarRating from "./StarRating";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from 'sweetalert2';


export const SearchP = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const searchRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [cityUserM, setcityUserM] = useState([])


  const handleArrowKeyPress = (event) => {
    if (filteredUsers.length === 0) return;

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, filteredUsers.length - 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < filteredUsers.length) {
        handleSelectUser(filteredUsers[selectedIndex]);
      }
    }
  };
 

  useEffect(() => {
    Swal.fire({
      text: ' Próximamente Tattopro en Google Play y App Store 🚀📱',
      showConfirmButton: false,
      timer: 2000,
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
      },
    });
    const showData = async () => {
      try {
        // Registrar el tiempo antes de hacer la solicitud
        const startTime = Date.now();
    
        const response = await getUsersWithRating();
        const data = response.data;
        console.log(data);
    
        // Calcular el tiempo de respuesta
        const endTime = Date.now();
        const responseTime = endTime - startTime;
    
        console.log(`Tiempo de respuesta: ${responseTime} ms`);
    
        const parsedUsers = parseUserData(data);
        setUsers(parsedUsers);
    
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: error,
          text: ' Aguarda un instante, el servidor está respondiendo ⌛ ¡Gracias por tu paciencia! 🙏',
          showConfirmButton: false,
          timer: 3000,
          customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
          },
        });
      }
    };
    

    if (users.length === 0) {
      showData();
    }

  }, [users]);
  // Agregar users como dependencia para que se ejecute solo cuando cambie la lista de usuarios

  const filterUsers = (allUsers, searchText) => {
    // Filtrar usuarios por nombre que coincida con el texto de búsqueda
    const filteredUsers = allUsers.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase().trim())
    );
  
    // Ordenar los usuarios filtrados por rating promedio y cantidad de ratings en orden descendente
    filteredUsers.sort((a, b) => {
      // Si no hay rating para alguno de los usuarios, colocamos el que sí lo tenga primero
      if (!a.average_rating && b.average_rating) {
        return 1;
      } else if (a.average_rating && !b.average_rating) {
        return -1;
      }
  
      // Si los usuarios tienen el mismo rating promedio, priorizar por cantidad de ratings
      if (b.average_rating === a.average_rating) {
        return b.rating_count - a.rating_count;
      }
      
      // Ordenar por rating promedio en orden descendente
      return b.average_rating - a.average_rating;
    });
  
    return filteredUsers;
  };
  
  
  

  useEffect(() => {
    if (isSearchClicked) {
      const filtered = filterUsers(users, search);
      setSelectedOption(null);
      setFilteredUsers(filtered.slice(0, 3));
    }
  }, [isSearchClicked, search, users]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearch("");
        setSelectedOption(null);
        setFilteredUsers([]);
        setIsSearchClicked(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSelectUser = (user) => {
    setSelectedOption(user);
    setSearch(user.name);
    navigate(`/profile/${encodeURIComponent(user.id)}/${encodeURIComponent(user.name)}`);
  }; 
  

  const parseUserData = (data) => {
    return data.map((item) => {
      const avatar = item.media_url || "/images/fondo.jpg";
      return {
        id: item.id,
        name: item.name,
        rol: item.rol,
        lon: item.lon,
        lat: item.lat,
        city: item.city,
        average_rating: parseFloat(item.average_rating).toFixed(1) || 0,
        avatar: avatar,
        rating_count:item.rating_count
      };
    });
  };
  
  return (
    <div className="search-container" onKeyDown={handleArrowKeyPress}>
      <div className='title'>Los mejores tatuadores con Tattopro 🎨 🌍prueba  </div>
      <div className='titleinput'>Busca los tatuadores </div>
      <FaMagnifyingGlass className='icones'/>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsSearchClicked(true);
        }}
        placeholder="Search"
        ref={searchRef}
        className='input'
      />
      {isSearchClicked && filteredUsers.length === 0 && (
        <div className="no-results">No se encontró</div>
      )}
      {isSearchClicked &&
        filteredUsers.map((user,i) => (
          <div
          key={user.id}
          className={`user-item ${selectedOption && selectedOption.id === user.id ? 'selected' : ''} ${
            i === selectedIndex ? 'highlighted' : ''
          }`}
          onClick={() => handleSelectUser(user)}
          onMouseEnter={() => setSelectedIndex(i)} // Cambiar el índice al pasar el ratón por encima
          onMouseLeave={() => setSelectedIndex(-1)} 
        >
            <div className='userDetails'>
              <div className='avatar' ><Avatar sx={{ width:60, height:60,border: '1px solid black'}} src={user.avatar} alt={user.name} /></div>
               
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="user-rol">{user.rol}</div>
              <div className="user-location">{user.city ? user.city.replace(/['"]/g, '') : ''}</div>
              {user.rol=='tatuador'&&(
               
                  <div className='user-start'>
                  
                    <StarRating rating={user.average_rating} />  {user.average_rating}</div>
                
                
              )
              }
              
            </div>                            
            </div>
           
          </div>
        ))}
          <div className='titlemap'>Mira los tatuadores mas cercanos a ti en la cuidad de {cityUserM} (busca por cuidades)</div>
          <div className='titlemapprovisional'>Por ahora solo tenemos tatuadores de prueba en Bogota y Santa Marta </div>

        <Mapa users={users} setcityUserM={setcityUserM}></Mapa>
    </div>
  );
};
