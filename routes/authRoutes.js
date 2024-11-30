const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Para comparar contraseñas cifradas
const router = express.Router();

// Clave secreta para los tokens
const SECRET_KEY = 'miClaveSecreta';

// Usamos el hash que generaste
const users = [
    { username: 'admin', password: '$2b$10$gMwI4mcmYsmyw.0DaKi9bOi/YEMaQ6oeDbbq1uqISQuv47WvcGq8W'} // Contraseña: 1234 (cifrada)
];

// Endpoint para autenticación
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Buscar usuario
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Verificar la contraseña usando bcrypt.compare
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Generar el token JWT
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token }); // Enviar el token como respuesta
});

module.exports = router;
