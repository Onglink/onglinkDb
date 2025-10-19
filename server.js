require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

// Rotas
const ongRoutes = require('./routes/ong');
const usuarioRoutes = require('./routes/usuario');

app.use('/api/ongs', ongRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.listen(port, () => {
  console.log(`🚀 Servidor ONGLINK-DB rodando em http://localhost:${port}`);
});