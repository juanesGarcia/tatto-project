import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/SearchP.css";
import { getUsers,getUsersWithRating} from '../api/auth';
import { Avatar } from '@mui/material';
import { Mapa } from "./Mapa";
import StarRating from "./StarRating";

export const SearchP = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const searchRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);


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
 

  
  const showData = async () => {
    try {
      // Llamar a la API solo si la lista de usuarios está vacía
      if (users.length === 0) {
        const response = await getUsersWithRating();
        const data = response.data;
        console.log(data)
        const parsedUsers = parseUserData(data);
        console.log(parsedUsers)
        setUsers(parsedUsers);
        console.log(parsedUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showData();
  }, []); // Agregar users como dependencia para que se ejecute solo cuando cambie la lista de usuarios

  const filterUsers = (allUsers, searchText) => {
    return allUsers.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase().trim()) ||
      user.id.toLowerCase().includes(searchText.toLowerCase().trim())
    );
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
        avatar: avatar
      };
    });
  };
  
  return (
    <div className="search-container" onKeyDown={handleArrowKeyPress}>
      <div className='titleinput'>busca los tatuadores </div>
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
                <div><StarRating rating={user.average_rating} />{user.average_rating}</div>
              )
              }
              
            </div>                            
            </div>
           
          </div>
        ))}
        <Mapa users={users}></Mapa>
    </div>
  );
};
