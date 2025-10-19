const express = require('express');
const router = express.Router();
const {
  cadastrarOng,
  listarOngs,
  atualizarOng,
  deletarOng,
  buscarOngPorId,
} = require('../controllers/ongController');

router.post('/', cadastrarOng);
router.get('/', listarOngs);
router.get('/:id', buscarOngPorId);
router.put('/:id', atualizarOng);
router.delete('/:id', deletarOng);

module.exports = router;