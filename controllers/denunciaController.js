const Publicacao = require("../models/publicacaoModel");
const Denuncia = require("../models/denunciaModel");

const cadastrarDenuncia = async (req, res) => {
    try {
        const novaDenuncia = new Denuncia(req.body);
        await novaDenuncia.save();
        res.status(201).json({
            message: "Denuncia efetuada com sucesso!",
            id: novaDenuncia._id,
        });
    } catch (err) {
        res.status(400).json({
            error: "Erro ao efetuar denúncia, dados inválidos ou faltando",
            details: err.message || err,
        });
    }
};

const listarDenuncia = async (req, res) => {
    try {
        const lista = await Denuncia.find({});
        res.status(200).json(lista);
    } catch (err) {
        res.status(500).json({
            error: "Erro ao listar Denúncias.",
            details: err.message || err,
        });
    }
};
const buscarDenuncia = async (req, res) => {
    try {
        const { id } = req.params;
        const denuncia = await Denuncia.findById(id).populate("assignedTo").exec();
        if (!denuncia) {
            return res.status(404).json({ error: "Denuncia não encontrada" });
        }

        res.status(200).json(denuncia);
    } catch (err) {
        res.status(500).json({
            error:
                "Erro ao buscar a Denúncia solicitada, verifique se o Id é válido.",
            details: err.message || err,
        });
    }
};

const deletarDenuncia = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Denuncia.findByIdAndDelete(id);
        if (!resultado) {
            return res
                .status(404)
                .json({ error: "Denuncia não encontrada, nada foi deletado." });
        }
        res.status(200).json({
            message: "Denuncia excluida com sucesso.",
            deleted: true,
        });
    } catch (err) {
        res.status(500).json({
            error: "Erro ao deletar a denúncia.",
            details: err.message || err,
        });
    }
};

module.exports = {
    cadastrarDenuncia,
    listarDenuncia,
    buscarDenuncia,
    deletarDenuncia,
};


