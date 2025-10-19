const express = require('express');
const router = express.Router();
const {
  criarPublicacao,
  listarPublicacoes,
  buscarPublicacaoPorId,
  atualizarPublicacao,
  deletarPublicacao
} = require('../controllers/publicacaoController');

router.post('/', criarPublicacao);
router.get('/', listarPublicacoes);
router.get('/:id', buscarPublicacaoPorId);
router.put('/:id', atualizarPublicacao);
router.delete('/:id', deletarPublicacao);

module.exports = router;