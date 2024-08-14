// Importamos las dependencias necesarias
const express = require('express'); // Framework para crear el servidor
const cors = require('cors'); // Middleware para manejar CORS (Cross-Origin Resource Sharing)
const connectDB = require('./config/db'); // Función para conectar a la base de datos
const userRouter = require('./routes/userRoutes'); // Rutas de usuario
const productRouter = require('./routes/productRoutes'); // Rutas de productos

// Configuramos las variables de entorno
require('dotenv').config();

// Inicializamos la aplicación Express
const app = express();

// Conectamos a la base de datos
connectDB();

// Configuración de CORS para permitir solicitudes desde orígenes específicos
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:3002'
];

const corsOptions = {
    origin: function (origin, callback) {
        // Permitir solicitudes sin origen (como Postman) o si el origen está en la lista permitida
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

// Aplicamos los middlewares
app.use(cors(corsOptions)); // Habilitamos CORS con las opciones configuradas
app.use(express.json()); // Habilitamos el parsing de JSON en las solicitudes

// Definimos las rutas
app.use('/api/user', userRouter); // Rutas relacionadas con usuarios
app.use('/api/product', productRouter); // Rutas relacionadas con productos

// Iniciamos el servidor en el puerto especificado en las variables de entorno
app.listen(process.env.PORT, () => {
    console.log('Servidor escuchando en el puerto ' + process.env.PORT);
});
