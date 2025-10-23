const express = require('express');
const router = express.Router();
const {
  criarPublicacao,
  buscarPublicacao,
  buscarPublicacaoPorId,
  editarPublicacao,
  excluirPublicacao
} = require('../controllers/publicacaoController');

router.post('/', criarPublicacao);
router.get('/',  buscarPublicacao);
router.get('/:id', buscarPublicacaoPorId);
router.put('/:id', editarPublicacao);
router.delete('/:id', excluirPublicacao);

module.exports = router;