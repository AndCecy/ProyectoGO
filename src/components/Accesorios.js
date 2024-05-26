import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Accesorios.css';

function Accesorios() {
  const [searchTerm, setSearchTerm] = useState('');
  const [accesorios, setAccesorios] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    unidad_de_medida: 'und',
    cantidad: ''
  });
  const [filteredAccesorios, setFilteredAccesorios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccesorios = async () => {
      try {
        const response = await fetch('http://localhost:3001/accesorios');
        const data = await response.json();
        setAccesorios(data);
        setFilteredAccesorios(data);
      } catch (error) {
        console.error('Error fetching accesorios:', error);
      }
    };

    fetchAccesorios();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const filtered = accesorios.filter((accesorio) =>
      accesorio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accesorio.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAccesorios(filtered);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddAccesorio = async (e) => {
    e.preventDefault();
    if (formData.nombre.trim() === '') return;

    try {
      const response = await fetch('http://localhost:3001/accesorios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const addedAccesorio = await response.json();
        setAccesorios((prevAccesorios) => [...prevAccesorios, addedAccesorio]);
        setFilteredAccesorios((prevAccesorios) => [...prevAccesorios, addedAccesorio]);
        setFormData({
          codigo: '',
          nombre: '',
          descripcion: '',
          unidad_de_medida: 'und',
          cantidad: ''
        });
        setShowForm(false);
      } else {
        console.error('Error adding accesorio');
      }
    } catch (error) {
      console.error('Error adding accesorio:', error);
    }
  };

  return (
    <div className="accesorios-container">
      <button onClick={() => navigate('/')}>Regresar a Home</button>
      <h2>Accesorios</h2>
      <div className="search-add-container">
        <input
          type="text"
          placeholder="Buscar accesorios por código o nombre..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Buscar</button>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Agregar Accesorio'}
        </button>
        {showForm && (
          <form onSubmit={handleAddAccesorio}>
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
            <input
              type="text"
              name="descripcion"
              placeholder="Descripción"
              value={formData.descripcion}
              onChange={handleChange}
            />
            <select
              name="unidad_de_medida"
              value={formData.unidad_de_medida}
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
        {filteredAccesorios.map((accesorio) => (
          <li key={accesorio.id}>
            {accesorio.codigo} - {accesorio.nombre} - {accesorio.descripcion} - {accesorio.unidad_de_medida} - {accesorio.cantidad}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Accesorios;


