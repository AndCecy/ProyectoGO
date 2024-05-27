const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;

app.use(cors());

const db = new sqlite3.Database('./data.db',(err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos SQLite');
    // Crea la tabla si no existe
    db.run('CREATE TABLE IF NOT EXISTS equipos ( id INTEGER PRIMARY KEY AUTOINCREMENT, fecha TEXT,numero_parte TEXT,numero_serie TEXT, nombre_impresora TEXT, problema TEXT, cliente TEXT, telefono TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS accesorios (id INTEGER PRIMARY KEY AUTOINCREMENT, codigo TEXT, nombre TEXT, descripcion TEXT, unidad_de_medida TEXT, cantidad INTEGER)');
    // Crear tabla suministros si no existe
    db.run(`
      CREATE TABLE IF NOT EXISTS suministros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo TEXT,
        nombre TEXT,
        unidad TEXT,
        cantidad INTEGER
      )
    `);
  }
});
// Crear tabla si no existe


app.use(express.json());

// Manejar la solicitud para guardar datos del formulario
app.post('/ingreso-equipo', (req, res) => {
  const { fecha, numero_parte, numero_serie, nombre_impresora, problema, cliente, telefono } = req.body;
  
  const sql ='INSERT INTO equipos (fecha, numero_parte, numero_serie, nombre_impresora, problema, cliente, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.run(sql,[fecha, numero_parte, numero_serie, nombre_impresora, problema, cliente, telefono], function(err) {
      if (err) {
        console.error('Error al insertar datos:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        console.log('Datos insertados correctamente');
        res.status(200).json({ message: 'Datos insertados correctamente'});
      }
    });
});



// Agrega un nuevo endpoint para obtener los registros de la base de datos
app.get('/registros-equipos', (req, res) => {
  db.all('SELECT * FROM equipos', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json(rows);
    }
  });
});


// Ruta para actualizar un equipo
app.put('/registros-equipos/:id', (req, res) => {
  const { id } = req.params;
  const { fecha, numero_parte, numero_serie, nombre_impresora, problema, cliente, telefono } = req.body;
  const query = `
    UPDATE equipos
    SET fecha = ?, numero_parte = ?, numero_serie = ?, nombre_impresora = ?, problema = ?, cliente = ?, telefono = ?
    WHERE id = ?
  `;
  db.run(query, [fecha, numero_parte, numero_serie, nombre_impresora, problema, cliente, telefono, id], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error interno del servidor');
    } else {
      res.send('Equipo actualizado exitosamente');
    }
  });
});

// Ruta para eliminar un equipo
app.delete('/registros-equipos/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM equipos WHERE id = ?`;
  db.run(query, id, function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error interno del servidor');
    } else {
      res.send('Equipo eliminado exitosamente');
    }
  });
});


// Obtener todos los accesorios
app.get('/accesorios', (req, res) => {
  db.all('SELECT * FROM accesorios', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json(rows);
    }
  });
});

// Agregar un nuevo accesorio
app.post('/accesorios', (req, res) => {
  const { codigo, nombre, descripcion, unidad_de_medida, cantidad } = req.body;
  const query = 'INSERT INTO accesorios (codigo, nombre, descripcion, unidad_de_medida, cantidad) VALUES (?, ?, ?, ?, ?)';
  db.run(query, [codigo, nombre, descripcion, unidad_de_medida, cantidad], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json({ id: this.lastID, codigo, nombre, descripcion, unidad_de_medida, cantidad });
    }
  });
});

// Actualizar un accesorio
app.put('/accesorios/:id', (req, res) => {
  const { id } = req.params;
  const { codigo, nombre, descripcion, unidad_de_medida, cantidad } = req.body;
  const query = 'UPDATE accesorios SET codigo = ?, nombre = ?, descripcion = ?, unidad_de_medida = ?, cantidad = ? WHERE id = ?';
  db.run(query, [codigo, nombre, descripcion, unidad_de_medida, cantidad, id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error interno del servidor');
    } else {
      res.send('Accesorio actualizado exitosamente');
    }
  });
});

// Eliminar un accesorio
app.delete('/accesorios/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM accesorios WHERE id = ?';
  db.run(query, id, function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error interno del servidor');
    } else {
      res.send('Accesorio eliminado exitosamente');
    }
  });
});

// Endpoint to add a new accessory
app.post('/accesorios', (req, res) => {
  const { codigo, nombre, descripcion, unidad_de_medida, cantidad } = req.body;
  const sql = `INSERT INTO accesorios (codigo, nombre, descripcion, unidad_de_medida, cantidad) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [codigo, nombre, descripcion, unidad_de_medida, cantidad], function (err) {
    if (err) {
      console.error('Error al insertar datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.status(200).json({ id: this.lastID, codigo, nombre, descripcion, unidad_de_medida, cantidad });
    }
  });
});

// Endpoint to get all accessories
app.get('/accesorios', (req, res) => {
  db.all('SELECT * FROM accesorios', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json(rows);
    }
  });
});

app.get('/suministros', (req, res) => {
  db.all('SELECT * FROM suministros', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json(rows);
    }
  });
});

app.post('/suministros', (req, res) => {
  const { codigo, nombre, unidad, cantidad } = req.body;
  const sql = 'INSERT INTO suministros (codigo, nombre, unidad, cantidad) VALUES (?, ?, ?, ?)';
  db.run(sql, [codigo, nombre, unidad, cantidad], function (err) {
    if (err) {
      console.error('Error al insertar datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Datos insertados correctamente');
      res.status(200).json({ id: this.lastID, codigo, nombre, unidad, cantidad });
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});