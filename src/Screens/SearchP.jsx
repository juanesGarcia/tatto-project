import { useState, useEffect } from 'react';
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
  const [showAllUsers, setShowAllUsers] = useState(false);

  const showData = async () => {
    try {
      const response = await getUsers();
      const data = response.data;
      const parsedUsers = parseUserData(data);
      setUsers(parsedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showData();
  }, []);

  useEffect(() => {
    // Filtra los usuarios según el texto de búsqueda en todos los usuarios
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered.slice(0, 3)); // Mostrar solo los primeros 3 usuarios filtrados
    setShowAllUsers(filtered.length > 3); // Mostrar la opción "Ver más" si hay más de 3 resultados
  }, [search, users]);

  const handleSelectUser = (user) => {
    setSelectedOption(user);
    setSearch(user.name);
    // Redirigir a la página de perfil con los datos en la URL
    navigate(`/profile/${encodeURIComponent(user.id)}/${encodeURIComponent(user.name)}`);
  };

  const handleViewMore = () => {
    setFilteredUsers(users.filter((user) =>
    
      user.name.toLowerCase().includes(search.toLowerCase())
    ));
    setShowAllUsers(false);
  };

  const parseUserData = (data) => {
    return data.map(item => {
      const match = item.row.match(/\((.*?),(.*?)\)/);
      return {
        id: match[1],
        name: match[2],
        avatar: "/images/fondo.jpg" // Reemplaza con la ruta real de la imagen de cada usuario
      };
    });
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="BUSCAR TATUADOR O ESTILO"
      />
      {filteredUsers.map((user) => (
        <div
          key={user.id}
          className={`user-item ${selectedOption && selectedOption.id === user.id ? 'selected' : ''}`}
          onClick={() => handleSelectUser(user)}
        >
          <Avatar src={user.avatar} alt={user.name} />
          <div className="user-details">
            <div className="user-name">{user.name}</div>
            <div className="user-location">Colombia, Bogotá</div>
          </div>
        </div>
      ))}
      {showAllUsers && (
        <button className="view-more-btn" onClick={handleViewMore}>
          Ver más
        </button>
      )}
    </div>
  );
};

