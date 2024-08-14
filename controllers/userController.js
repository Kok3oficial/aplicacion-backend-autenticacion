// Importamos el modelo de usuario y bcrypt para encriptar contraseñas
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controlador para registrar un nuevo usuario
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Verificamos si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Creamos un nuevo usuario con la contraseña encriptada
        user = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        });

        // Guardamos el usuario en la base de datos
        await user.save();

        // Generamos un token de autenticación
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Retornamos el token al cliente
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ msg: 'Error al registrar el usuario' });
    }
};

// Controlador para iniciar sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Verificamos si el usuario existe
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Verificamos la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Generamos un token de autenticación
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Retornamos el token al cliente
        res.json({ token });
    } catch (error) {
        res.status(500).json({ msg: 'Error al iniciar sesión' });
    }
};

// Controlador para verificar el token de autenticación
exports.verifyToken = (req, res) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, autorización denegada' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        res.json({ msg: 'Token válido' });
    } catch (error) {
        res.status(401).json({ msg: 'Token no es válido' });
    }
};

// Controlador para actualizar la información del usuario
exports.updateUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Actualizamos los campos
        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        // Guardamos los cambios
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar la información del usuario' });
    }
};
