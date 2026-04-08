const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 9000;

const db = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'tecsup_password',
    database: 'automotriz',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 20000
});

app.use(express.static('public'));

app.get('/vehiculos', (req, res) => {
    const queryTabla = `CREATE TABLE IF NOT EXISTS vehiculos (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        modelo VARCHAR(100), 
        precio DECIMAL(12,2)
    )`;

    db.query(queryTabla, (err) => {
        if (err) return res.status(500).json(err);
        
        db.query('SELECT COUNT(*) AS total FROM vehiculos', (err, result) => {
            if (result && result[0].total === 0) {
                const sql = "INSERT INTO vehiculos (modelo, precio) VALUES ?";
                const deportivos = [
                    ['Ferrari F8 Tributo', 280000.00],
                    ['Lamborghini Huracán Evo', 260000.00],
                    ['Porsche 911 Turbo S', 210000.00],
                    ['McLaren 720S', 310000.00],
                    ['Aston Martin DBS', 330000.00],
                    ['Audi R8 V10', 160000.00],
                    ['Bugatti Chiron', 3000000.00],
                    ['Koenigsegg Jesko', 2800000.00],
                    ['Maserati MC20', 215000.00],
                    ['Lotus Emira', 75000.00]
                ];
                db.query(sql, [deportivos]);
            }
            db.query('SELECT * FROM vehiculos', (err, rows) => {
                if (err) return res.status(500).json(err);
                res.json(rows);
            });
        });
    });
});

app.get('/vendedores', (req, res) => {
    const queryVendedores = `CREATE TABLE IF NOT EXISTS vendedores (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        nombre VARCHAR(100),
        ciudad VARCHAR(100)
    )`;

    db.query(queryVendedores, (err) => {
        if (err) return res.status(500).json(err);
        
        db.query('SELECT COUNT(*) AS total FROM vendedores', (err, result) => {
            if (result && result[0].total === 0) {
                const sql = "INSERT INTO vendedores (nombre, ciudad) VALUES ?";
                const staff = [
                    ['Alonso Alejo', 'Arequipa'],
                    ['Valentina Ross', 'Lima'],
                    ['Julian Ferrari', 'Módena'],
                    ['Sophia Benz', 'Stuttgart'],
                    ['Marco Lamborghini', 'Sant’Agata'],
                    ['Elena Porsche', 'Leipzig'],
                    ['Sebastian Vettel', 'Heppenheim'],
                    ['Lewis Hamilton', 'Stevenage']
                ];
                db.query(sql, [staff]);
            }
            db.query('SELECT * FROM vendedores', (err, rows) => {
                if (err) return res.status(500).json(err);
                res.json(rows);
            });
        });
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`
    -------------------------------------------
    🚀 Servidor "Sport Selection" iniciado
    📍 URL: http://localhost:${port}
    📦 Docker Status: Ready
    -------------------------------------------
    `);
});