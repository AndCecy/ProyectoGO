// Suministros.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Suministros.css';

function Suministros() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suministros, setSuministros] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    unidad: 'und',
    cantidad: ''
  });
  const [filteredSuministros, setFilteredSuministros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuministros = async () => {
      try {
        const response = await fetch('http://localhost:3001/suministros');
        const data = await response.json();
        setSuministros(data);
        setFilteredSuministros(data);
      } catch (error) {
        console.error('Error fetching suministros:', error);
      }
    };

    fetchSuministros();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const filtered = suministros.filter((suministro) =>
      suministro.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suministro.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSuministros(filtered);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddSuministro = async (e) => {
    e.preventDefault();
    if (formData.nombre.trim() === '') return;

    try {
      const response = await fetch('http://localhost:3001/suministros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const addedSuministro = await response.json();
        setSuministros((prevSuministros) => [...prevSuministros, addedSuministro]);
        setFilteredSuministros((prevSuministros) => [...prevSuministros, addedSuministro]);
        setFormData({
          codigo: '',
          nombre: '',
          unidad: 'und',
          cantidad: ''
        });
        setShowForm(false);
      } else {
        console.error('Error adding suministro');
      }
    } catch (error) {
      console.error('Error adding suministro:', error);
    }
  };

  return (
    <div className="suministros-container">
      <button onClick={() => navigate('/')}>Regresar a Home</button>
      <h2>Suministros</h2>
      <div className="search-add-container">
        <input
          type="text"
          placeholder="Buscar suministros por código o nombre..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Buscar</button>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Agregar Suministro'}
        </button>
        {showForm && (
          <form onSubmit={handleAddSuministro}>
            <input
              type="text"
              name="codigo"
              placeholder="Código"
              value={formData.codigo}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <select
              name="unidad"
              value={formData.unidad}
              onChange={handleChange}
              required
            >
              <option value="und">und</option>
              <option value="ml">ml</option>
            </select>
            <input
              type="number"
              name="cantidad"
              placeholder="Cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              required
            />
            <button type="submit">Agregar</button>
          </form>
        )}
      </div>
      <ul>
        {filteredSuministros.map((suministro) => (
          <li key={suministro.id}>
            {suministro.codigo} - {suministro.nombre} - {suministro.unidad} - {suministro.cantidad}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Suministros;
