const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function cadastrarUsuario(req, res) {
  try {
    await client.connect();
    const db = client.db('onglinkDb');
    const usuarios = db.collection('usuarios');
    const resultado = await usuarios.insertOne(req.body);
    res.status(201).json({ message: 'Usuário cadastrado', id: resultado.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cadastrar', details: err });
  } finally {
    await client.close();
  }
}

async function listarUsuarios(req, res) {
  try {
    await client.connect();
    const db = client.db('onglinkDb');
    const usuarios = db.collection('usuarios');
    const lista = await usuarios.find({}).toArray();
    res.status(200).json(lista);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar', details: err });
  } finally {
    await client.close();
  }
}

async function atualizarUsuario(req, res) {
  try {
    await client.connect();
    const db = client.db('onglinkDb');
    const usuarios = db.collection('usuarios');
    const { id } = req.params;
    const resultado = await usuarios.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );
    res.status(200).json({ message: 'Usuário atualizado', modified: resultado.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar', details: err });
  } finally {
    await client.close();
  }
}

async function deletarUsuario(req, res) {
  try {
    await client.connect();
    const db = client.db('onglinkDb');
    const usuarios = db.collection('usuarios');
    const { id } = req.params;
    const resultado = await usuarios.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: 'Usuário deletado', deleted: resultado.deletedCount });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar', details: err });
  } finally {
    await client.close();
  }
}

module.exports = {
  cadastrarUsuario,
  listarUsuarios,
  atualizarUsuario,
  deletarUsuario
};