import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../estilos/Historias.css';
import { useNavigate } from 'react-router-dom';

function Historias() {
  const [equipos, setEquipos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEquipo, setEditingEquipo] = useState(null); // Estado para el equipo en edición
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const response = await fetch('http://localhost:3001/registros-equipos');
        if (response.ok) {
          const data = await response.json();
          setEquipos(data);
        } else {
          console.error('Error al obtener datos de equipos:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchEquipos();
  }, []);

  // Función para filtrar equipos según el término de búsqueda
  const filteredEquipos = equipos.filter(equipo =>
    equipo.numero_parte.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para manejar la edición de un equipo
  const handleEdit = (equipo) => {
    setEditingEquipo(equipo);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/registros-equipos/${editingEquipo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingEquipo),
      });
      if (response.ok) {
        const updatedEquipo = await response.json();
        setEquipos(equipos.map(e => (e.id === updatedEquipo.id ? updatedEquipo : e)));
        setEditingEquipo(null);
      } else {
        console.error('Error al actualizar el equipo:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  // Función para manejar la eliminación de un equipo
  const handleDelete = async (equipoId) => {
    try {
      const response = await fetch(`http://localhost:3001/registros-equipos/${equipoId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setEquipos(equipos.filter(e => e.id !== equipoId));
      } else {
        console.error('Error al eliminar el equipo:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="container">
      <h2>Historias</h2>
      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por número de parte"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Número de parte</th>
            <th>Número de serie</th>
            <th>Nombre de la impresora</th>
            <th>Problema</th>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredEquipos.map((equipo, index) => (
            <tr key={index}>
              <td>{editingEquipo && editingEquipo.id === equipo.id ? (
                <input
                  type="text"
                  value={editingEquipo.fecha}
                  onChange={(e) => setEditingEquipo({ ...editingEquipo, fecha: e.target.value })}
                />
              ) : equipo.fecha}</td>
              <td>{editingEquipo && editingEquipo.id === equipo.id ? (
                <input
                  type="text"
                  value={editingEquipo.numero_parte}
                  onChange={(e) => setEditingEquipo({ ...editingEquipo, numero_parte: e.target.value })}
                />
              ) : equipo.numero_parte}</td>
              <td>{editingEquipo && editingEquipo.id === equipo.id ? (
                <input
                  type="text"
                  value={editingEquipo.numero_serie}
                  onChange={(e) => setEditingEquipo({ ...editingEquipo, numero_serie: e.target.value })}
                />
              ) : equipo.numero_serie}</td>
              <td>{editingEquipo && editingEquipo.id === equipo.id ? (
                <input
                  type="text"
                  value={editingEquipo.nombre_impresora}
                  onChange={(e) => setEditingEquipo({ ...editingEquipo, nombre_impresora: e.target.value })}
                />
              ) : equipo.nombre_impresora}</td>
              <td>{editingEquipo && editingEquipo.id === equipo.id ? (
                <input
                  type="text"
                  value={editingEquipo.problema}
                  onChange={(e) => setEditingEquipo({ ...editingEquipo, problema: e.target.value })}
                />
              ) : equipo.problema}</td>
              <td>{editingEquipo && editingEquipo.id === equipo.id ? (
                <input
                  type="text"
                  value={editingEquipo.cliente}
                  onChange={(e) => setEditingEquipo({ ...editingEquipo, cliente: e.target.value })}
                />
              ) : equipo.cliente}</td>
              <td>{editingEquipo && editingEquipo.id === equipo.id ? (
                <input
                  type="text"
                  value={editingEquipo.telefono}
                  onChange={(e) => setEditingEquipo({ ...editingEquipo, telefono: e.target.value })}
                />
              ) : equipo.telefono}</td>
              <td>
                {editingEquipo && editingEquipo.id === equipo.id ? (
                  <button onClick={handleSaveEdit}>Guardar</button>
                ) : (
                  <button onClick={() => handleEdit(equipo)}>Editar</button>
                )}
                <button onClick={() => handleDelete(equipo.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/')}>Regresar a Home</button>
    </div>
  );
}

export default Historias;
