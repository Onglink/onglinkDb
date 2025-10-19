
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://rafael_sartori:onglink_fatec@onglinkdb.9kxqdci.mongodb.net/';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('onglinkDb');
    const usuarios = db.collection('usuarios');

    const novoUsuario = {
      CodUsuario: 1001,
      CNPJ: "12.345.678/0001-99", // se for representante de ONG
      Email: "ana.souza@exemplo.com",
      Senha: "senhaSegura123", // idealmente criptografada em produção
      Nome: "Ana Souza",
      Perfil: "user", // USER, ADMIN, ou ONG (LIBERADO PELO SISTEMA)
      ImgPerfil: "https://exemplo.com/imagens/ana.jpg",
      Descricao: "Representante da ONG Vida Verde, atuando em projetos de reflorestamento."
    };

    const resultado = await usuarios.insertOne(novoUsuario);
    console.log('✅ Usuário cadastrado com sucesso:', resultado.insertedId);
  } catch (err) {
    console.error('❌ Erro ao cadastrar usuário:', err);
  } finally {
    await client.close();
  }
}

run();
