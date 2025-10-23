const apiKeyAuth = require('./middleware/apiKeyAuth');

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API Onglink',
        description: 'Documentação da API usando Swagger',
    },
    host: 'localhost:4000',
    schemes: ['http'],
    securityDefinitions: {
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'x-api-key',
            description: process.env.API_KEY
        },
    },
    security: [{
        apiKeyAuth: []
    }],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js', './routes/ong.js', './routes/publicacao.js', './routes/usuario.js']

swaggerAutogen(outputFile, endpointsFiles, doc);