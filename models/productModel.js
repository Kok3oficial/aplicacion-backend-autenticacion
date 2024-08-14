// Importamos mongoose para interactuar con MongoDB
const mongoose = require('mongoose');

// Definimos el esquema del producto
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true }); // Agrega campos de createdAt y updatedAt automáticamente

// Exportamos el modelo Product basado en el esquema productSchema
module.exports = mongoose.model('Product', productSchema);
