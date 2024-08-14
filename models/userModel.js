// Importamos mongoose para interactuar con MongoDB
const mongoose = require('mongoose');

// Definimos el esquema del usuario
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Agrega campos de createdAt y updatedAt automáticamente

// Exportamos el modelo User basado en el esquema userSchema
module.exports = mongoose.model('User', userSchema);
