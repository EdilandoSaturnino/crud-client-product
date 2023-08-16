const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    quantidade: {
        type: Number,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    valorTotal: {
        type: Number,
        required: true
    },
    valorUnitario: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Product', productSchema);
