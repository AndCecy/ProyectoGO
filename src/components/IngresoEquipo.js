import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/IngresoEquipo.css';

function IngresoEquipo() {
  const [formData, setFormData] = useState({
    fecha: '',
    numero_parte: '',
    numero_serie: '',
    nombre_impresora: '',
    problema: '',
    cliente: '',
    telefono: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
    //({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3001/ingreso-equipo',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      if (response.ok) {
        console.log('Datos guardados exitosamente');
      } else {
        console.error('Error al guardar datos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };


  return (
    <div className="form-container">
      <button onClick={() => navigate('/')}>Regresar a Home</button>
      <form onSubmit={handleSubmit}>
        <label>
          Fecha:
          <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required/>
        </label>
        <label>
          Número de parte:
          <input type="text" name="numero_parte" value={formData.numero_parte} onChange={handleChange} />
        </label>
        <label>
          Número de serie:
          <input type="text" name="numero_serie" value={formData.numero_serie} onChange={handleChange} />
        </label>
        <label>
          Nombre de la impresora:
          <input type="text" name="nombre_impresora" value={formData.nombre_impresora} onChange={handleChange} />
        </label>
        <label>
          Problema:
          <textarea name="problema" value={formData.problema} onChange={handleChange}></textarea>
        </label>
        <label>
          Cliente:
          <input type="text" name="cliente" value={formData.cliente} onChange={handleChange} />
        </label>
        <label>
          Teléfono:
          <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}


export default IngresoEquipo;
