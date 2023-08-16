const Image = require('../models/Image');

exports.createImage = async (req, res) => {
    try {
        const { url, descricao } = req.body;
        const novaImagem = await Image.create({ url, descricao });
        res.json(novaImagem);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao criar uma imagem' });
    }
};

exports.getImages = async (req, res) => {
    try {
        const imagens = await Image.find();
        res.json(imagens);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao recuperar imagens' });
    }
};

exports.updateImage = async (req, res) => {
    try {
        const { imageId } = req.params;
        const { url, descricao } = req.body;

        const updatedImage = await Image.findByIdAndUpdate(imageId, { url, descricao }, { new: true });

        if (!updatedImage) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.json(updatedImage);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update image' });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const { imageId } = req.params;

        const deletedImage = await Image.findByIdAndDelete(imageId);

        if (!deletedImage) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.json({ message: 'Image deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete image' });
    }
};

exports.deleteAllImages = async (req, res) => {
    try {
        await Image.deleteMany({});
        res.json({ message: 'All images deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete images' });
    }
};
