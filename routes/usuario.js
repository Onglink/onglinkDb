// const express = require('express');
// const router = express.Router();

// const allowCors = fn => async (req, res) => {
//   // **1. Defina a Origem Permitida (Seu Frontend)**
//   res.setHeader('Access-Control-Allow-Origin', 'https://onglink.vercel.app'); 

//   // 2. Defina os Métodos e Cabeçalhos Permitidos
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

//   // 3. Gerencie o Preflight (Requisição OPTIONS)
//   // O navegador envia OPTIONS primeiro para verificar as permissões.
//   if (req.method === 'OPTIONS') {
//     res.status(200).end();
//     return;
//   }

//   // 4. Executa a função de API principal
//   return await fn(req, res);
// }

// module.exports = allowCors(loginHandler);

// const {
//   cadastrarUsuario,
//   listarUsuarios,
//   buscarUsuarioPorId,
//   atualizarUsuario,
//   deletarUsuario,
//   loginUsuario,
// } = require('../controllers/usuarioController');

// router.post('/login', loginUsuario);
// router.post('/', cadastrarUsuario);
// router.get('/', listarUsuarios);
// router.get('/:id', buscarUsuarioPorId);
// router.put('/:id', atualizarUsuario);
// router.delete('/:id', deletarUsuario);


// module.exports = router;

// novo router:
const express = require('express');
const router = express.Router();

const {
    cadastrarUsuario,
    listarUsuarios,
    buscarUsuarioPorId,
    atualizarUsuario,
    deletarUsuario,
    loginUsuario, 
} = require('../controllers/usuarioController'); 

router.post('/login', loginUsuario);
router.post('/', cadastrarUsuario);
router.get('/', listarUsuarios);
router.get('/:id', buscarUsuarioPorId);
router.put('/:id', atualizarUsuario);
router.delete('/:id', deletarUsuario);



module.exports = router;