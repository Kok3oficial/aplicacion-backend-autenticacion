// Importamos JWT para verificar el token
const jwt = require('jsonwebtoken');

// Middleware para verificar la autenticación
module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');

    // Verificamos si el token está presente
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, autorización denegada' });
    }

    try {
        // Verificamos el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token no es válido' });
    }
};
