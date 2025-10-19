const express = require('express');
const router = express.Router();
const {
  cadastrarUsuario,
  listarUsuarios,
  atualizarUsuario,
  deletarUsuario
} = require('../controllers/usuarioController');

router.post('/', cadastrarUsuario);
router.get('/', listarUsuarios);
router.put('/:id', atualizarUsuario);
router.delete('/:id', deletarUsuario);

module.exports = router;