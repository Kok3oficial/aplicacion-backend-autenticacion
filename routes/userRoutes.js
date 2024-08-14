// Importamos express y el controlador de usuario
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Ruta para registrar un nuevo usuario
router.post('/register', userController.register);

// Ruta para iniciar sesión
router.post('/login', userController.login);

// Ruta para verificar el token de autenticación
router.get('/verifytoken', auth, userController.verifyToken);

// Ruta para actualizar la información del usuario
router.put('/update', auth, userController.updateUser);

module.exports = router;
