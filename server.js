require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());


const allowedOrigins = ['https://onglink.vercel.app'];

// Configuração do CORS
app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permite todos os métodos que você usa
  credentials: true, // Importante se você usa cookies ou sessões
}));

const mongoose = require('mongoose');

// Importando middleware e swagger

const apiKeyAuth = require('./middleware/apiKeyAuth') 
const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(apiKeyAuth) 

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Conexão com MongoDB Atlas estabelecida com sucesso!');
        
        // Inicia o servidor Express SOMENTE após a conexão com o banco
        app.listen(port, () => {
            console.log(`🚀 Servidor ONGLINK-DB rodando em http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('❌ Erro ao conectar ao MongoDB Atlas:', err.message);
        // Em caso de erro grave na conexão, é bom encerrar o processo
        process.exit(1); 
    });



// Rotas
const ongRoutes = require('./routes/ong');
const usuarioRoutes = require('./routes/usuario');
const publicacaoRoutes = require('./routes/publicacao');
const denunciaRoutes = require('./routes/denuncia');


app.use('/api/ongs', ongRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/publicacoes', publicacaoRoutes); 
app.use('/api/denuncia',denunciaRoutes);

