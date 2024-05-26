
// App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
 } from "react-router-dom"; // Importa BrowserRouter desde 'react-router-dom'
import Home from './components/index.js';
import IngresoEquipo from "./components/IngresoEquipo";
import Historias from './components/Historias';
import Accesorios from './components/Accesorios';
import Suministros from './components/Suministros';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="ingresoequip" element={<IngresoEquipo />} />
          <Route path="historias" element={<Historias />} />
          <Route path="accesorios" element={<Accesorios />} />
          <Route path="suministros" element={<Suministros />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;


