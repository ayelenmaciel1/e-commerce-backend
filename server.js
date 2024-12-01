const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const apiRoutes = require('./routes/apiRoutes'); // Importa el archivo de rutas

// Middleware
app.use(cors()); //  Habilitar CORS
app.use(express.json()); // Para poder parsear JSON en las solicitudes
app.use(express.static(path.join(__dirname, 'public'))); // Archivos estáticos (CSS, JS, imágenes)


// Usar las rutas para acceder a los archivos JSON
app.use('/api/data', apiRoutes); // Con esta línea se conectan las rutas del archivo apiRoutes.js


// Configuración del puerto
const PORT = process.env.PORT || 5000; // Usará el puerto 5000 si no está especificado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

const db = require('../db'); // Importar la conexión a la base de datos

app.post('/api/compra', (req, res) => {
    const {
        formas_de_envio,
        departamento,
        localidad,
        calle,
        numero,
        esquina,
        formas_de_pago,
        total,
    } = req.body;
}

db.beginTransaction(err => {
    if (err) {
        return res.status(500).json({ message: 'Error saving the transaction.' });
        ;
    }
     // Insertar el pedido en la tabla `compra`
     const compraQuery = `
      INSERT INTO compra (formas_de_envio, departamento, localidad, calle, numero, esquina, formas_de_pago, total)
            VALUES (?,?,?,?,?,?,?,?)
        `;

    db.query(compraQuery, [formas_de_envio, departamento, localidad, calle, numero, esquina, formas_de_pago, total], (err, results) => {
        if (err) {
                return db.rollback(() => callback(err)); // Revertir la transacción en caso de error
            }



})}

const compraId = result.insertID, 
const productValues = productos.map (item => [
    productoId, 
    product_name,
    product_price,
    quantity
]);

db.commit(err => {
    if (err) {
        return db.rollback(() => {
            res.status(500).json({ message: 'Error saving the transaction.'}, err);
        });
    }
    res.json('Transacción confirmada exitosamente.');
});

))