const Ong = require('../models/Ong'); 


exports.cadastrarOng = async (req, res) => {
    try {
        
        const novaOng = new Ong(req.body); 
        await novaOng.save(); 

        res.status(201).json({ 
            message: 'ONG cadastrada com sucesso!', 
            id: novaOng._id 
        });
    } catch (err) {
        
        res.status(400).json({
            error: 'Erro ao cadastrar ONG.', 
            details: err.message || err 
        });
    }
};


exports.listarOngs = async (req, res) => {
    try {
        
        const lista = await Ong.find({}); 
        
        res.status(200).json(lista);
    } catch (err) {
        res.status(500).json({ 
            error: 'Erro ao listar ONGs.', 
            details: err.message || err 
        });
    }
};


exports.buscarOngPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const ong = await Ong.findById(id)
                              .populate('assignedTo', 'nome email') // Exibe nome e email dos usuários
                              .exec(); // Executa a query

        if (!ong) {
            return res.status(404).json({ error: 'ONG não encontrada.' });
        }

        res.status(200).json(ong);
    } catch (err) {
        res.status(500).json({ 
            error: 'Erro ao buscar ONG. Verifique se o ID é válido.', 
            details: err.message || err 
        });
    }
};


exports.atualizarOng = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await Ong.findByIdAndUpdate(
            id, 
            { $set: req.body }, 
            { new: true, runValidators: true } 
        );

        if (!resultado) {
            return res.status(404).json({ error: 'ONG não encontrada para atualizar.' });
        }
        
        res.status(200).json({ 
            message: 'ONG atualizada com sucesso!', 
            ong: resultado 
        });
    } catch (err) {
        res.status(400).json({ 
            error: 'Erro ao atualizar ONG. Verifique os dados.', 
            details: err.message || err 
        });
    }
};


exports.deletarOng = async (req, res) => {
    try {
        const { id } = req.params;
        
       
        const resultado = await Ong.findByIdAndDelete(id); 

        if (!resultado) {
            // Se o resultado for null, significa que não havia ONG com esse ID.
            return res.status(404).json({ error: 'ONG não encontrada para deletar.' });
        }

        res.status(200).json({ 
            message: 'ONG deletada com sucesso!', 
            deleted: true 
        });
    } catch (err) {
        res.status(500).json({ 
            error: 'Erro ao deletar ONG.', 
            details: err.message || err 
        });
    }
};

module.exports = {
    cadastrarOng,
    listarOngs,
    atualizarOng,
    deletarOng,
    buscarOngPorId
};