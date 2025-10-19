require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Rotas
const ongRoutes = require('./routes/ong');
const usuarioRoutes = require('./routes/usuario');
const publicacaoRoutes = require('./routes/publicacao'); // ✅ nova rota

app.use('/api/ongs', ongRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/publicacoes', publicacaoRoutes); // ✅ nova rota

app.listen(port, () => {
  console.log(`🚀 Servidor ONGLINK-DB rodando em http://localhost:${port}`);
});