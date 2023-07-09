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

  const showData = async () => {
    try {
      const response = await getUsers();
      const data = response.data;
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
      const match = item.row.match(/\((.*?),(.*?)\)/);
      return {
        id: match[1],
        name: match[2],
        avatar: "/images/fondo.jpg"
      };
    });
  };

  return (
    <div className="search-container">
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
        filteredUsers.map((user) => (
          <div
            key={user.id}
            className={`user-item ${selectedOption && selectedOption.id === user.id ? 'selected' : ''}`}
            onClick={() => handleSelectUser(user)}
          >
            <div className='userDetails'>
              <div className='avatar' ><Avatar sx={{ width:60, height:60}} src={user.avatar} alt={user.name} /></div>
               
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="user-location">Colombia</div>
              <div className="user-location">Bogota</div>
            </div>|                                 
            <div className='stars'>*******</div>
            </div>
           
          </div>
        ))}
    </div>
  );
};
