const mongoose = require('mongoose')
const Schema = mongoose.Schema


// --- 1. Schema Principal de usuário ---
let userSchema = new Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Email deve ser único
    status:{type: String, enum:['user','admin','ong']},
    senha:{type:String, required: true},
},


{ 
    strict: true, 
    timestamps: true 
});

module.exports = mongoose.model('Usuario', userSchema)