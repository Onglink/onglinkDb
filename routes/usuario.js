const express = require('express');
const router = express.Router();
const {
  cadastrarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario
} = require('../controllers/usuarioController');

router.post('/', cadastrarUsuario);
router.get('/', listarUsuarios);
router.get('/:id', buscarUsuarioPorId);
router.put('/:id', atualizarUsuario);
router.delete('/:id', deletarUsuario);

module.exports = router;