const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function criarPublicacao(req, res) {
  try {
    await client.connect();
    const db = client.db('onglinkDb');
    const publicacoes = db.collection('publicacoes');

    const novaPublicacao = {
      CodPubli: req.body.CodPubli,
      Titulo: req.body.Titulo,
      Texto: req.body.Texto,
      Imagens: req.body.Imagens || [],
      CodUsuario: req.body.CodUsuario,
      DataPublicacao: new Date()
    };

    const resultado = await publicacoes.insertOne(novaPublicacao);
    res.status(201).json({ message: 'Publicação criada com sucesso', id: resultado.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar publicação', details: err });
  } finally {
    await client.close();
  }
}

async function listarPublicacoes(req, res) {
  try {
    await client.connect();
    const db = client.db('onglinkDb');
    const publicacoes = db.collection('publicacoes');
    const lista = await publicacoes.find({}).toArray();
    res.status(200).json(lista);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar publicações', details: err });
  } finally {
    await client.close();
  }
}

async function buscarPublicacaoPorId(req, res) {
  try {
    await client.connect();
    const db = client.db('onglinkDb');
    const publicacoes = db.collection('publicacoes');
    const { id } = req.params;
    const resultado = await publicacoes.findOne({ _id: new ObjectId(id) });

    if (!resultado) {
      return res.status(404).json({ error: 'Publicação não encontrada' });
    }

    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar publicação', details: err });
  } finally {
    await client.close();
  }
}

async function atualizarPublicacao(req, res) {
  try {
    await client.connect();
    const db = client.db('onglinkDb');
    const publicacoes = db.collection('publicacoes');
    const { id } = req.params;

    const resultado = await publicacoes.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    res.status(200).json({ message: 'Publicação atualizada', modified: resultado.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar publicação', details: err });
  } finally {
    await client.close();
  }
}

async function deletarPublicacao(req, res) {
  try {
    await client.connect();
    const db = client.db('onglinkDb');
    const publicacoes = db.collection('publicacoes');
    const { id } = req.params;

    const resultado = await publicacoes.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: 'Publicação deletada', deleted: resultado.deletedCount });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar publicação', details: err });
  } finally {
    await client.close();
  }
}

module.exports = {
  criarPublicacao,
  listarPublicacoes,
  buscarPublicacaoPorId,
  atualizarPublicacao,
  deletarPublicacao
};