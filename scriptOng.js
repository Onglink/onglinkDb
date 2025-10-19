//estrutura de cadastro para ong
// {
//   RazaoSocial: "Associação Amigos da Natureza",
//   NomeFantasia: "Amigos da Natureza",
//   CNPJ: "12.345.678/0001-99",
//   CPF: "123.456.789-00",
//   RepLegal: "Maria Silva",
//   Telefone: "(11) 91234-5678",
//   Email: "contato@amigosnatureza.org",
//   Endereco: {
//     NumeroEnd: "123",
//     Complemento: "Sala 4",
//     Bairro: "Centro",
//     Cidade: "Sorocaba",
//     Estado: "SP",
//     CEP: "18000-000",
//     Rua: "Rua das Árvores"
//   },
//   Logo: "https://exemplo.com/logo.png",
//   Descricao: "ONG voltada à preservação ambiental e educação ecológica.",
//   DataFund: new Date("2010-05-15"),
//   CausaSocial: ["Meio Ambiente", "Educação"],
//   RedeSocial: {
//     Instagram: "@amigosnatureza",
//     Facebook: "fb.com/amigosnatureza",
//     Site: "https://amigosnatureza.org"
//   },
//   ArquivosLegais: [
//     "https://exemplo.com/documentos/estatuto.pdf",
//     "https://exemplo.com/documentos/ata_fundacao.pdf"
//   ],
//   Imagens: [
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
    const ongs = db.collection('ongs');

    const novaOng = {
      RazaoSocial: "Associação Amigos da Natureza",
      NomeFantasia: "Amigos da Natureza",
      CNPJ: "12.345.678/0001-99",
      CPF: "123.456.789-00",
      RepLegal: "Maria Silva",
      Telefone: "(11) 91234-5678",
      Email: "contato@amigosnatureza.org",
      Endereco: {
        NumeroEnd: "123",
        Complemento: "Sala 4",
        Bairro: "Centro",
        Cidade: "Sorocaba",
        Estado: "SP",
        CEP: "18000-000",
        Rua: "Rua das Árvores"
      },
      Logo: "https://exemplo.com/logo.png",
      Descricao: "ONG voltada à preservação ambiental e educação ecológica.",
      DataFund: new Date("2010-05-15"),
      CausaSocial: "Meio Ambiente",
      RedeSocial: {
        Instagram: "@amigosnatureza",
        Facebook: "fb.com/amigosnatureza",
        Site: "https://amigosnatureza.org"
      },
      ArquivosLegais: [
        "https://exemplo.com/documentos/estatuto.pdf",
        "https://exemplo.com/documentos/ata_fundacao.pdf"
      ],
      Imagens: [
        "https://exemplo.com/imagens/acao1.jpg",
        "https://exemplo.com/imagens/evento2.jpg"
      ]
    };

    const resultado = await ongs.insertOne(novaOng);
    console.log('✅ ONG cadastrada com sucesso:', resultado.insertedId);
  } catch (err) {
    console.error('❌ Erro ao cadastrar ONG:', err);
  } finally {
    await client.close();
  }
}

run();