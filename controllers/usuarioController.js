const Usuario = require('../models/usuarioModel'); 

const cadastrarUsuario = async (req, res) => {
    try {
        
        const novoUsuario = new Usuario(req.body); 

        
        await novoUsuario.save(); 

        
        res.status(201).json({ 
            message: 'Usuário cadastrado com sucesso!', 
            id: novoUsuario._id 
        });
    } catch (err) {
               if (err.code === 11000) {
            return res.status(400).json({ 
                error: 'Email ou CPF já cadastrado.', 
                details: err.message 
            });
        }
        res.status(400).json({ 
            error: 'Erro ao cadastrar usuário.', 
            details: err.message || err 
        });
    }
};


const listarUsuarios = async (req, res) => {
    try {
        // Usa find(). Como a senha tem 'select: false' no Model, ela será omitida.
        const lista = await Usuario.find({}); 
        
        res.status(200).json(lista);
    } catch (err) {
        res.status(500).json({ 
            error: 'Erro ao listar usuários.', 
            details: err.message || err 
        });
    }
};



const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        
        
        const resultado = await Usuario.findByIdAndUpdate(
            id, 
            { $set: dadosAtualizados }, 
            { new: true, runValidators: true } 
        ).select('-senha'); 

        if (!resultado) {
            return res.status(404).json({ error: 'Usuário não encontrado para atualizar.' });
        }
        
        res.status(200).json({ 
            message: 'Usuário atualizado com sucesso!', 
            usuario: resultado 
        });
    } catch (err) {
        res.status(400).json({ 
            error: 'Erro ao atualizar usuário. Verifique os dados.', 
            details: err.message || err 
        });
    }
};


const deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        
        const resultado = await Usuario.findByIdAndDelete(id); 

        if (!resultado) {
            return res.status(404).json({ error: 'Usuário não encontrado para deletar.' });
        }

        res.status(200).json({ 
            message: 'Usuário deletado com sucesso!', 
            deleted: true 
        });
    } catch (err) {
        res.status(500).json({ 
            error: 'Erro ao deletar usuário. Verifique se o ID é válido.', 
            details: err.message || err 
        });
    }
};

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    atualizarUsuario,
    deletarUsuario,
    
};