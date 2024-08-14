// Importamos express y el controlador de producto
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

// Ruta para crear un nuevo producto
router.post('/create', auth, productController.createProduct);

// Ruta para leer todos los productos
router.get('/readall', productController.readAllProducts);

// Ruta para leer un producto específico
router.get('/readone/:id', productController.readOneProduct);

// Ruta para actualizar un producto
router.put('/update/:id', auth, productController.updateProduct);

// Ruta para eliminar un producto
router.delete('/delete/:id', auth, productController.deleteProduct);

module.exports = router;
