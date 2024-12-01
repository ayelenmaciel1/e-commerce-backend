const jwt = require('jsonwebtoken');

// Clave secreta para verificar el token
const SECRET_KEY = 'miClaveSecreta';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']; // Obtener el token del header

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

    // Validar el token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado.' });
        }
        req.user = decoded; // Guardar los datos del usuario decodificados en la request
        next(); // Continuar al siguiente middleware o ruta
    });
};

module.exports = verifyToken;
