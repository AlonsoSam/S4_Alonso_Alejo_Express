const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h1>Catálogo de Productos</h1><p>Lista de productos disponibles.</p>');
});

module.exports = router;