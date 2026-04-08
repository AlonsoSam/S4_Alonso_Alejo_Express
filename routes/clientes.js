const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h1>Panel de Clientes</h1><p>Lista de clientes de Tecsup.</p>');
});

module.exports = router;