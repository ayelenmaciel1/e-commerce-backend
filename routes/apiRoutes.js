const express = require('express'); // Importa Express para crear el servidor
const router = express.Router(); // Crea un enrutador de Express
const path = require('path'); // Importa path para manejar rutas de archivos
const fs = require('fs'); // Importa fs para trabajar con el sistema de archivos

// Ruta para obtener el contenido de todos los archivos JSON en una subcarpeta
router.get('/:folder', (req, res) => {
    const folder = req.params.folder; // Carpeta dentro de 'data'
    const folderPath = path.join(__dirname, '../data', folder);

    // Leer el contenido de la carpeta
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(404).json({ error: `Carpeta ${folder} no encontrada.` });
        }

        // Filtrar solo archivos .json
        const jsonFiles = files.filter(file => file.endsWith('.json'));

        // Leer y parsear cada archivo JSON
        const jsonData = {};
        jsonFiles.forEach(file => {
            const filePath = path.join(folderPath, file);
            const content = fs.readFileSync(filePath, 'utf-8'); // Leer contenido
            jsonData[file] = JSON.parse(content); // Agregar contenido parseado
        });

        res.json(jsonData); // Enviar todos los datos como respuesta
    });
});


// Ruta para obtener un archivo JSON específico
router.get('/:folder/:fileName', (req, res) => {
    const folder = req.params.folder;
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '../data', folder, `${fileName}.json`);

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).json({ error: `Archivo ${fileName}.json no encontrado en la carpeta ${folder}.` });
        }
    });
});

module.exports = router;
