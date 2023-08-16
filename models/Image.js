const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Image', imageSchema);