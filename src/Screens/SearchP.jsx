import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/SearchP.css";
import { getUsers } from '../api/auth';
import { Avatar } from '@mui/material';

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
      const response = await getUsers();
      const data = response.data;
      console.log(data)
      const parsedUsers = parseUserData(data);
      console.log(parsedUsers);
      setUsers(parsedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showData();
  }, []);

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
      const match = item.row.match(/\((.*?),(.*?),(.*?),(.*?),(.*?),(.*?)\)/);
      console.log(match)
      return {
        id: match[1],
        name: match[2],
        rol:match[3],
        lon:match[4],
        lat:match[5],
        city:match[6],
        avatar: "/images/fondo.jpg"
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
              <div className='avatar' ><Avatar sx={{ width:60, height:60}} src={user.avatar} alt={user.name} /></div>
               
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className='stars'>*******</div>
              <div className="user-rol">{user.rol}</div>
              <div className="user-location">{user.city}</div>
            </div>                            
            </div>
           
          </div>
        ))}
    </div>
  );
};
