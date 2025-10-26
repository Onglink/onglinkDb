const mongoose = require('mongoose')
const Schema = mongoose.Schema


// --- 1. Schema Principal de publicação ---
const publicacaoSchema = new Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    imagem:[{type: String, required: true}],
    assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ong',
    default: null, // Opcional, será preenchido na validação
  }
},


{ 
    strict: true, 
    timestamps: true 
});

module.exports = mongoose.model('Publicacao', publicacaoSchema)