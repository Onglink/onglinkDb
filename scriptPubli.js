// use ('onglinkDb');

// db.runCommand({
//    collMod: "publicacoes",
//    validator: {
//       $jsonSchema: {
//          bsonType: "object",
//          required: [
//             "CodPubli",
//             "DataPublicacao",
//             "Texto",
//             "Titulo",
//             "Imagens",
//             "CodUsuario"
//          ],
//          properties: {
//             CodPubli: {
//                bsonType: "int",
//                description: "Obrigatório e deve ser um inteiro (Chave Primária)"
//             },
//             DataPublicacao: {
//                bsonType: "date",
//                description: "Obrigatório e deve ser uma data"
//             },
//             Texto: {
//                bsonType: "string",
//                description: "Obrigatório e deve ser uma string para o corpo do texto"
//             },
//             Titulo: {
//                bsonType: "string",
//                description: "Obrigatório e deve ser uma string"
//             },
//             Imagens: {
//                bsonType: "array",
//                items: {
//                   bsonType: "string"
//                },
//                description: "Obrigatório e deve ser um array de strings"
//             },
//             CodUsuario: {
//                bsonType: ["int", "objectId"],
//                description: "Obrigatório e deve ser o código do usuário que publicou"
//             }
//          }
//       }
//    },
//    // Garante que a validação seja aplicada a TODAS as operações
//    validationLevel: "strict",
//    // Garante que a operação falhe (retorne erro) se a validação falhar
//    validationAction: "error"
// }
// --- Campos Obrigatórios ---
// db.publicacoes.insertOne({
    
//     CodPubli: 10, 
//     DataPublicacao: new Date(),
//     Texto: "Nosso primeiro post após a validação de esquema, falando sobre nossa nova iniciativa de arrecadação.",
//     Titulo: "Nova Campanha de Doações Lançada!", 
//         Imagens: [
//         "https://images.pexels.com/photos/32997/pexels-photo.jpg",
//         "https://images.pexels.com/photos/32595987/pexels-photo-32595987.jpeg"
//     ],
//     CodUsuario: 9999,
//     _id: ObjectId() 
// })
// console.log(
// db.publicacoes.find({})
// );

const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://rafael_sartori:onglink_fatec@onglinkdb.9kxqdci.mongodb.net/';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('onglinkDb');
    const publicacoes = db.collection('publicacoes');

    const resultado = await publicacoes.insertOne({
      CodPubli: 10,
      DataPublicacao: new Date(),
      Texto: "Nosso primeiro post após a validação de esquema, falando sobre nossa nova iniciativa de arrecadação.",
      Titulo: "Nova Campanha de Doações Lançada!",
      Imagens: [
        "https://images.pexels.com/photos/32997/pexels-photo.jpg",
        "https://images.pexels.com/photos/32595987/pexels-photo-32595987.jpeg"
      ],
      CodUsuario: 9999
    });

    console.log('✅ Documento inserido com sucesso:', resultado);
  } catch (err) {
    console.error('❌ Erro ao conectar ou inserir:', err);
  } finally {
    await client.close();
  }
}

run();
