import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/SearchP.css";
import { getUser } from '../api/auth';
import Select from 'react-select';
import { Avatar } from '@mui/material';

export const SearchP = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState([]);

  const showData = async () => {
    try {
      const response = await getUser();
      const data = response.data;
      const parsedUsers = parseUserData(data);
      setUsers(parsedUsers);
      console.log(parsedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showData();
  }, []);

  useEffect(() => {
    // Filtra las opciones según el texto de búsqueda
    const filtered = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
    setFilteredOptions(filtered.map(user => ({ value: user.id, label: user.name, avatar: user.avatar })));
  }, [search, users]);

  const handleSelectChange = selectedOption => {
    setSelectedOption(selectedOption);
    setSearch(selectedOption ? selectedOption.label : "");
    // Redirigir a la página de perfil con los datos en la URL
    if (selectedOption) {
      navigate(`/profile/${encodeURIComponent(selectedOption.value)}/${encodeURIComponent(selectedOption.label)}`);
    }
  };

  const parseUserData = data => {
    return data.map(item => {
      const match = item.row.match(/\((.*?),(.*?)\)/);
      return {
        id: match[1],
        name: match[2],
        avatar: "/images/fondo.jpg" // Reemplaza con la ruta real de la imagen de cada usuario
      };
    });
  };

  const formatOptionLabel = ({ value, label, avatar }) => (
    <div className="option-container">
      <div className="label-container">
        <Avatar src={avatar} alt={label} className="avatar" />
             <div className='label'>{label}</div>
      </div>
      <div className="value-container">
        <div className="values">colombia </div>
        <div className="values">bogota</div>

      </div>
    </div>
  );
  

  return (
    <Select
      options={filteredOptions}
      value={selectedOption}
      onChange={handleSelectChange}
      placeholder="Select an option"
      formatOptionLabel={formatOptionLabel}
    />
  );
};
