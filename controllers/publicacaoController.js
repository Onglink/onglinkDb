const Ong = require('../models/ongModel'); 
const Usuario = require('../models/usuarioModel');
const Publicacao = require('../models/publicacaoModel');

const postarNoFeed = async (req, res) => {
    try {
        const novaPublicacao = new Publicacao(req.body);
        const publicacaoSalva = await novaPublicacao.save();

        res.status(201).json(publicacaoSalva);
    } catch (error) {
                res.status(400).json({ 
            message: 'Erro ao criar a publicação.', 
            error: error.message 
        });
    }
};


const buscarPost = async (req, res) => {
    try {
        const publicacoes = await Publicacao
            .find({})
            .populate('assignedTo', 'nome email') 
            .sort({ createdAt: -1 })// ordenar das mais novas para as mais antigas
            .exec();

        res.status(200).json(publicacoes);
    } catch (error) {
        res.status(500).json({ 
            message: 'Erro ao buscar publicações.', 
            error: error.message 
        });
    }
};


const buscarPostPorId = async (req, res) => {
    try {
        const publicacao = await Publicacao
            .findById(req.params.id)
            .populate('assignedTo', 'nome email'); 

        if (!publicacao) {
            return res.status(404).json({ message: 'Publicação não encontrada.' });
        }

        res.status(200).json(publicacao);
    } catch (error) {
        res.status(500).json({ 
            message: 'Erro ao buscar a publicação.', 
            error: error.message 
        });
    }
};


const editarPost = async (req, res) => {
    try {
        const publicacaoAtualizada = await Publicacao.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } 
          ).populate('assignedTo', 'nome email');

        if (!publicacaoAtualizada) {
            return res.status(404).json({ message: 'Publicação não encontrada para edição.' });
        }

        res.status(200).json(publicacaoAtualizada);
    } catch (error) {
        
        res.status(400).json({ 
            message: 'Erro ao editar a publicação.', 
            error: error.message 
        });
    }
};


const deletarPost = async (req, res) => {
    try {
        const publicacaoExcluida = await Publicacao.findByIdAndDelete(req.params.id);

        if (!publicacaoExcluida) {
            return res.status(404).json({ message: 'Publicação não encontrada para exclusão.' });
        }

        
        res.status(204).send(); 
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Erro ao excluir a publicação.', 
            error: error.message 
        });
    }
};



module.exports = {
  postarNoFeed,
  buscarPost,
  buscarPostPorId,
  editarPost,
  deletarPost,
  
};