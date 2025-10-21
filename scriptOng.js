//estrutura de cadastro para ong
// {
//   "RazaoSocial": "Nova ONG",
//   "NomeFantasia": "Amigos do Brasil sqn",
//   "CNPJ": "98.765.432/0001-99",
//   "CPF": "987.654.321-00",
//   "RepLegal": "Arnold Schwarzenegger",
//   "Telefone": "(99) 99887-6542",
//   "Email": "contato@ongdogoverno.gov",
//   "Endereco": {
//     "NumeroEnd": "10",
//     "Complemento": "palácio do planalto",
//     "Bairro": "Centro",
//     "Cidade": "Brasilia",
//     "Estado": "DF",
//     "CEP": "18000-171",
//     "Rua": "Rua da toga"
//   },
//   "Logo": "https://exemplo.com/logo.png",
//   "Descricao": "ONG voltada à arrecadação de fundos",
//   "DataFund": "1500-04-15",
//   "CausaSocial": "Saúde",
//   "RedeSocial": {
//     "Instagram": "@amigosdobrasilsqn",
//     "Facebook": "fb.com/amigosdobrasilsqn",
//     "Site": "https://amigosdobrasilsqn.org"
//   },
//   "ArquivosLegais": [
//     "https://exemplo.com/documentos/estatuto.pdf",
//     "https://exemplo.com/documentos/ata_fundacao.pdf"
//   ],
//   "Imagens": [
//     "https://exemplo.com/imagens/acao1.jpg",
//     "https://exemplo.com/imagens/evento2.jpg"
//   ]
// }
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://rafael_sartori:onglink_fatec@onglinkdb.9kxqdci.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('onglinkDb');

    // Aplica o schema de validação à collection existente
    await db.command({
      collMod: 'ongs',
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: [
            'razaoSocial', 'nomeFantasia', 'cnpj', 'cpf', 'repLegal',
            'telefone', 'email', 'endereco', 'logo', 'descricao',
            'dataFund', 'causaSocial', 'redeSocial', 'arquivosLegais', 'imagens','usuario'
          ],
          properties: {
            razaoSocial: { bsonType: 'string' },
            nomeFantasia: { bsonType: 'string' },
            cnpj: { bsonType: 'string' },
            cpf: { bsonType: 'string' },
            repLegal: { bsonType: 'string' },
            telefone: { bsonType: 'string' },
            email: { bsonType: 'string' },
            endereco: {
              bsonType: 'object',
              required: ['numeroEnd', 'complemento', 'bairro', 'cidade', 'estado', 'cep', 'rua'],
              properties: {
                numeroEnd: { bsonType: 'string' },
                complemento: { bsonType: 'string' },
                bairro: { bsonType: 'string' },
                cidade: { bsonType: 'string' },
                estado: {
                  bsonType: 'string',
                  enum: ['SP', 'RJ', 'MG', 'AC'] // ajuste conforme necessário
                },
                cep: { bsonType: 'string' },
                rua: { bsonType: 'string' }
              }
            },
            logo: { bsonType: 'string' },
            descricao: { bsonType: 'string' },
            dataFund: { bsonType: 'date' },
            causaSocial: { bsonType: 'string' },
            redeSocial: {
              bsonType: 'object',
              required: ['instagram', 'facebook', 'site'],
              properties: {
                instagram: { bsonType: 'string' },
                facebook: { bsonType: 'string' },
                site: { bsonType: 'string' }
              }
            },
            arquivosLegais: {
              bsonType: 'array',
              items: { bsonType: 'string' }
            },
            imagens: {
              bsonType: 'array',
              items: { bsonType: 'string' }
            },
            usuario: {
              bsonType: 'object',
              required: [''],
              properties: {
                nome: { bsonType: 'string' },
                
                status: {
                  bsonType: 'string',
                  enum: ['ong','user','admin'] // ajuste conforme necessário
                },
               
              }
            },

          }
        }
      },
      validationLevel: 'strict',
      validationAction: 'error'
    });

    // Agora insere a ONG normalmente
    
    const resultado = await ongs.insertOne(novaOng);
    console.log('✅ ONG cadastrada com sucesso:', resultado.insertedId);
  } catch (err) {
    console.error('❌ Erro ao cadastrar ONG:', err);
  } finally {
    await client.close();
  }
}

run();