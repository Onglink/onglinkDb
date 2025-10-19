const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function cadastrarOng(req, res) {
  try {
    await client.connect();
    const db = client.db('onglinkDb');
    const ongs = db.collection('ongs');
    const resultado = await ongs.insertOne(req.body);
    res.status(201).json({ message: 'Ong cadastrada', id: resultado.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao cadastrar', details: err });
  } finally {
    await client.close();
  }
}

async function listarOngs(req, res) {
  try {
    await client.connect();
    const db = client.db('onglinkDb');
    const ongs = db.collection('ongs');
    const lista = await ongs.find({}).toArray();
    res.status(200).json(lista);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar', details: err });
  } finally {
    await client.close();
  }
}

async function buscarOngPorId (req, res) {
  try {
    await client.connect();
    const db = client.db('onglinkDb');
    const ongs = db.collection('ongs');
    const { id } = req.params;

    const ong = await ongs.findOne({ _id: new ObjectId(id) });

    if (!ong) {
      return res.status(404).json({ error: 'ONG não encontrada' });
    }

    res.status(200).json(ong);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar ONG', details: err });
  } finally {
    await client.close();
  }
}


async function atualizarOng(req, res) {
  try {
    await client.connect();
    const db = client.db('onglinkDb');
    const ongs = db.collection('ongs');
    const { id } = req.params;
    const resultado = await ongs.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );
    res.status(200).json({ message: 'Ong atualizada', modified: resultado.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar', details: err });
  } finally {
    await client.close();
  }
}

async function deletarOng(req, res) {
  try {
    await client.connect();
    const db = client.db('onglinkDb');
    const ongs = db.collection('ongs');
    const { id } = req.params;
    const resultado = await ongs.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: 'Ong deletada', deleted: resultado.deletedCount });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar', details: err });
  } finally {
    await client.close();
  }
}

module.exports = {
  cadastrarOng,
  listarOngs,
  atualizarOng,
  deletarOng,
  buscarOngPorId
};