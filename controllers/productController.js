// Importamos el modelo de producto
const Product = require('../models/productModel');

// Controlador para crear un nuevo producto
exports.createProduct = async (req, res) => {
    const { name, description, price } = req.body;
    try {
        // Creamos un nuevo producto
        const newProduct = new Product({
            name,
            description,
            price,
            user: req.user.id // Asociamos el producto al usuario autenticado
        });

        // Guardamos el producto en la base de datos
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear el producto' });
    }
};

// Controlador para leer todos los productos
exports.readAllProducts = async (req, res) => {
    try {
        // Obtenemos todos los productos
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener los productos' });
    }
};

// Controlador para leer un producto específico
exports.readOneProduct = async (req, res) => {
    const { id } = req.params;
    try {
        // Obtenemos el producto por su ID
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener el producto' });
    }
};

// Controlador para actualizar un producto
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
        // Obtenemos y actualizamos el producto por su ID
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar el producto' });
    }
};

// Controlador para eliminar un producto
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        // Eliminamos el producto por su ID
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }
        res.json({ msg: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar el producto' });
    }
};
