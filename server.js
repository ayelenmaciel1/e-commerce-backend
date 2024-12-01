const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const apiRoutes = require('./routes/apiRoutes'); // Importa el archivo de rutas 
const authRoutes = require('./routes/authRoutes'); // Rutas de autenticación
const verifyToken = require('./routes/authMiddleware');


// Middleware
app.use(cors()); //  Habilitar CORS
app.use(express.json()); // Para poder parsear JSON en las solicitudes
app.use(express.static(path.join(__dirname, 'public'))); // Archivos estáticos (CSS, JS, imágenes)


// Usar las rutas para acceder a los archivos JSON
app.use('/api/auth', authRoutes); // Ruta para autenticación

// Proteger todas las rutas excepto las de autenticación
app.use('/api/data', verifyToken); // Aplica el middleware solo a las rutas de "data"

// Rutas protegidas
app.use('/api/data', apiRoutes); // Con esta línea se conectan las rutas del archivo apiRoutes.js


// Configuración del puerto
const PORT = process.env.PORT || 5000; // Usará el puerto 5000 si no está especificado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});