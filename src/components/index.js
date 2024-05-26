import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Link,
  useNavigate,
  Route
 } from "react-router-dom";
//import { Routes, Route, useNavigate } from 'react-router-dom';
import '../estilos/Home.css';
import logo from '../logo.svg';
import IngresoEquipo from "./IngresoEquipo";
import Historias from './Historias';
import Accesorios from './Accesorios';
import Suministros from './Suministros';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path, { replace: true }); // Reemplaza la ruta actual con la nueva ruta
  };

  return (
    <div className="Home">
      <header>
        <img src={logo} alt="Logo" />
      </header>
      <nav>
        <ul>
          <li>
            <button onClick={() => handleNavigation('/ingresoequip')}>INGRESO EQUIPO</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/historias')}>HISTORIAS</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/accesorios')}>ACCESORIOS</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/suministros')}>SUMINISTROS</button>
          </li>
        </ul>
      </nav>
      
    </div>
  );
}

export default Home;
