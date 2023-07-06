import React, { useEffect, useState } from 'react';
import "../Styles/SearchP.css";
import { getUser } from '../api/auth';
import Select from 'react-select';

export const SearchP = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  const showData = async () => {
    try {
      const response = await getUser();
      setUsers(response.data);
      console.log(response.data);
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
    setFilteredOptions(filtered.map(user => ({ value: user.name, label: user.name })));
  }, [search, users]);

  const handleSelectChange = (selectedOption) => {
    setSearch(selectedOption.value);
    console.log(search);
    // Redirigir a otra página con el valor seleccionado
    window.location.href = `/profile/${selectedOption.value}`;
  };

  return (
        <Select
          options={filteredOptions}
          value={filteredOptions.find(option => option.value === search)}
          onChange={handleSelectChange}
          placeholder="Select an option"
        />
   
  )
}
