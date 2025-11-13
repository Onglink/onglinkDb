// const Usuario = require('../models/usuarioModel');

// const cadastrarUsuario = async (req, res) => {
//     try {

//         const novoUsuario = new Usuario(req.body);


//         await novoUsuario.save();


//         res.status(201).json({
//             message: 'Usuário cadastrado com sucesso!',
//             id: novoUsuario._id
//         });
//     } catch (err) {
//         if (err.code === 11000) {
//             return res.status(400).json({
//                 error: 'Email ou CPF já cadastrado.',
//                 details: err.message
//             });
//         }
//         res.status(400).json({
//             error: 'Erro ao cadastrar usuário, dados inválidos ou faltando.',
//             details: err.message || err
//         });
//     }
// };


// const listarUsuarios = async (req, res) => {
//     try {
//         // Usa find(). Como a senha tem 'select: false' no Model, ela será omitida.
//         const lista = await Usuario.find({}).select('-senha');

//         res.status(200).json(lista);
//     } catch (err) {
//         res.status(500).json({
//             error: 'Erro ao listar usuários.',
//             details: err.message || err
//         });
//     }
// };

// const buscarUsuarioPorId = async (req, res) => {
//     try{
//         const {id} = req.params;
//         const usuario = await Usuario.findById(id).select('-senha');

//         if (!usuario) {
//             return res.status(404).json({ error: 'Usuário não encontrado.' });
//         }
//         res.status(200).json({usuario});
//     } catch (err) {
//         res.status(500).json({
//             error:'Erro ao bucar o usuário, verifique o Id.',
//             details: err.message || err
//         });

//     }
// }



// const atualizarUsuario = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const dadosAtualizados = req.body;


//         const resultado = await Usuario.findByIdAndUpdate(
//             id,
//             { $set: dadosAtualizados },
//             { new: true, runValidators: true }
//         ).select('-senha');

//         if (!resultado) {
//             return res.status(404).json({ error: 'Usuário não encontrado para atualizar.' });
//         }

//         res.status(200).json({
//             message: 'Usuário atualizado com sucesso!',
//             usuario: resultado
//         });
//     } catch (err) {
//         res.status(400).json({
//             error: 'Erro ao atualizar usuário. Verifique os dados.',
//             details: err.message || err
//         });
//     }
// };


// const deletarUsuario = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const resultado = await Usuario.findByIdAndDelete(id);

//         if (!resultado) {
//             return res.status(404).json({ error: 'Usuário não encontrado para deletar.' });
//         }

//         res.status(200).json({
//             message: 'Usuário deletado com sucesso!',
//             deleted: true
//         });
//     } catch (err) {
//         res.status(500).json({
//             error: 'Erro ao deletar usuário. Verifique se o ID é válido.',
//             details: err.message || err
//         });
//     }
// };

// const loginUsuario = async (req, res) => {
//     try {
//         const { email, senha } = req.body;

//         if (!email || !senha) {
//             return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
//         }

//         // 2. Busca o usuário pelo email e INCLUI a senha na busca (+senha)
//         // Precisamos do '+senha' porque no Schema ela está como 'select: false'
//         const usuario = await Usuario.findOne({ email }).select('+senha');

//         if (!usuario) {
//             return res.status(401).json({ error: 'Email ou senha inválidos.' });
//         }

//         // 3. Comparação de senha (ATENÇÃO: Isso é comparação de texto simples!)
//         // Se você estiver usando bcrypt, troque por: await bcrypt.compare(senha, usuario.senha)
//         if (senha !== usuario.senha) {
//             return res.status(401).json({ error: 'Email ou senha inválidos.' });
//         }

//         // 4. Login bem-sucedido! Retorna os dados (sem a senha)
//         usuario.senha = undefined; // Remove a senha do objeto final por segurança

//         res.status(200).json({
//             message: 'Login realizado com sucesso!',
//             usuario: {
//                 _id: usuario._id,
//                 nome: usuario.nome,
//                 email: usuario.email,
//                 status: usuario.status
//             }
            
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Erro interno no servidor ao realizar login.' });
//     }
// };

// module.exports = {
//     cadastrarUsuario,
//     listarUsuarios,
//     buscarUsuarioPorId,
//     atualizarUsuario,
//     deletarUsuario,
//     loginUsuario,
    
// };

//novo usuarioController
const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcrypt'); // Importe o bcrypt
const jwt = require('jsonwebtoken'); // Importe o jsonwebtoken

// --- CADASTRO ---
const cadastrarUsuario = async (req, res) => {
    try {
        // (O seu código de cadastro já estava bom, mas precisa do hash de senha)
        // Assumindo que seu 'usuarioModel' já faz o hash da senha automaticamente
        // usando um 'pre-save' hook. Se não, você precisa fazer o hash aqui.
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

// --- LOGIN (Corrigido para usar Bcrypt e JWT) ---
const loginUsuario = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
        }

        // 1. Busca o usuário e inclui a senha (+senha)
        const usuario = await Usuario.findOne({ email }).select('+senha');

        if (!usuario) {
            return res.status(401).json({ error: 'Email ou senha inválidos.' });
        }

        // 2. Compara a senha enviada com a senha HASHED do banco
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ error: 'Email ou senha inválidos.' });
        }

        // 3. Gera o Token JWT
        const token = jwt.sign(
            { id: usuario._id, email: usuario.email, role: usuario.status }, // Dados que vão no token
            process.env.JWT_SECRET, // Sua chave secreta (do .env)
            { expiresIn: '8h' } // Tempo de expiração
        );

        // 4. Login bem-sucedido! Retorna o Token e os dados
        usuario.senha = undefined; // Remove a senha da resposta

        // RESPOSTA 200 OK (Isso corrige o 204)
        res.status(200).json({
            message: 'Login realizado com sucesso!',
            token: token, // Envia o token para o frontend
            usuario: usuario 
        });

    } catch (err) {
        console.error("Erro no login:", err);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

// --- LISTAR TODOS ---
const listarUsuarios = async (req, res) => {
    try {
        const lista = await Usuario.find({}).select('-senha');
        res.status(200).json(lista);
    } catch (err) {
        res.status(500).json({
            error: 'Erro ao listar usuários.',
            details: err.message || err
        });
    }
};

// --- BUSCAR POR ID ---
const buscarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id).select('-senha');

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.status(200).json({ usuario }); // Ajustei para enviar o objeto
    } catch (err) {
        res.status(500).json({
            error: 'Erro ao bucar o usuário.',
            details: err.message || err
        });
    }
}

// --- ATUALIZAR ---
const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;

        // (Se a senha for atualizada, ela precisa ser "hashed" novamente)
        // (O ideal é ter uma rota separada /atualizar-senha)

        const resultado = await Usuario.findByIdAndUpdate(
            id,
            { $set: dadosAtualizados },
            { new: true, runValidators: true }
        ).select('-senha');

        if (!resultado) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.status(200).json({
            message: 'Usuário atualizado com sucesso!',
            usuario: resultado
        });
    } catch (err) {
        res.status(400).json({
            error: 'Erro ao atualizar usuário.',
            details: err.message || err
        });
    }
};

// --- DELETAR ---
const deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Usuario.findByIdAndDelete(id);

        if (!resultado) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.status(200).json({
            message: 'Usuário deletado com sucesso!',
            deleted: true
        });
    } catch (err) {
        res.status(500).json({
            error: 'Erro ao deletar usuário.',
            details: err.message || err
        });
    }
};

// Exporta todas as funções
module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    buscarUsuarioPorId,
    atualizarUsuario,
    deletarUsuario,
    loginUsuario,
};